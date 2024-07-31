import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  Minus,
  X,
  BadgeInfo,
  ThumbsUp,
  MessageCircleMore,
  Send,
} from "lucide-react";

let initialProducts = [
  {
    Id: 1,
    image:
      "https://i.pinimg.com/474x/02/c4/2b/02c42b86ff8bbc931fa5f6ed09985ba4.jpg",
    name: "Apel",
    price: 20000,
    stock: 10,
    color: "red",
  },
  {
    Id: 2,
    image:
      "https://i.pinimg.com/474x/ee/4e/8b/ee4e8bce3f09eb02804be47bdef70468.jpg",
    name: "Pisang",
    price: 15000,
    stock: 15,
    color: "yellow",
  },
  {
    Id: 3,
    image:
      "https://i.pinimg.com/474x/f3/72/67/f372679b7c4382279d08740975f0c1be.jpg",
    name: "Jeruk",
    price: 12000,
    stock: 8,
    color: "orange",
  },
];

const saveProduct = localStorage.getItem("fruit");

function Product() {
  const [products, setProducts] = useState(
    saveProduct ? JSON.parse(saveProduct) : initialProducts
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Id: "",
    image: "",
    name: "",
    price: "",
    stock: "",
    color: "",
  });
  const [cart, setCart] = useState([]);

  const handleInfo = (product) => {
    alert(
      `Nama: ${product.name}\nHarga: Rp ${product.price}\nStok: ${product.stock}\nWarna: ${product.color}`
    );
  };

  const handleLike = (product) => {
    alert(`Anda menyukai produk ${product.name}`);
  };

  const handleComment = (product) => {
    const comment = prompt(
      `Berikan komentar Anda tentang ${product.name}:`,
      "Komentar Anda"
    );
    if (comment) {
      alert(`Komentar Anda: ${comment}\nTerima kasih atas tanggapan Anda!`);
    }
  };

  const handleSend = (product) => {
    if (window.confirm(`Anda yakin ingin mengirim produk ${product.name}?`)) {
      const updatedProducts = products.map((p) =>
        p.Id === product.Id ? { ...p, stock: p.stock - 1 } : p
      );
      setProducts(updatedProducts);
      alert(
        `Produk ${product.name} berhasil dikirim, sisa ${
          product.stock - 1
        } buah`
      );
    }
  };

  const handleShowForm = (product) => {
    if (product) {
      setNewProduct(product);
      setEditMode(true);
    } else {
      const newId = products.length ? products[products.length - 1].Id + 1 : 1;
      setNewProduct({ ...newProduct, Id: newId });
      setEditMode(false);
    }
    setShowForm(true);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.stock &&
      newProduct.image &&
      newProduct.color
    ) {
      const newId = products.length ? products[products.length - 1].Id + 1 : 1;
      const updatedProducts = [...products, { ...newProduct, Id: newId }];
      setProducts(updatedProducts);
      localStorage.setItem("fruit", JSON.stringify(updatedProducts));
      setShowForm(false);
      setNewProduct({
        Id: "",
        image: "",
        name: "",
        price: "",
        stock: "",
        color: "",
      });
    } else {
      alert("Semua kolom harus diisi!");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.stock &&
      newProduct.image &&
      newProduct.color
    ) {
      const updatedProducts = products.map((prod) =>
        prod.Id === newProduct.Id ? newProduct : prod
      );
      setProducts(updatedProducts);
      localStorage.setItem("fruit", JSON.stringify(updatedProducts));
      setShowForm(false);
      setNewProduct({
        Id: "",
        image: "",
        name: "",
        price: "",
        stock: "",
        color: "",
      });
      setEditMode(false);
    } else {
      alert("Semua kolom harus diisi!");
    }
  };

  const handleChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleDelete = (productToDelete) => {
    const confirmation = window.confirm(
      `Apakah Anda yakin ingin menghapus produk ${productToDelete.name}?`
    );
    if (confirmation) {
      const updatedProducts = products.filter(
        (item) => item.Id !== productToDelete.Id
      );
      setProducts(updatedProducts);
      localStorage.setItem("fruit", JSON.stringify(updatedProducts));
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.Id === product.Id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.Id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.Id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.Id !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const sortedProducts = products.sort((a, b) => {
    const sortByValue =
      a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
    return sortOrder === "asc" ? sortByValue : -sortByValue;
  });

  const filteredProducts = sortedProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("fruit", JSON.stringify(products));
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-300 flex flex-col items-center justify-center py-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-6xl w-full">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Produk</h1>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleShowForm()}
          >
            <Plus size={18} className="mr-2" />
            <span>Tambah Produk</span>
          </button>
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart size={18} className="mr-2" />
            <span>Lihat Keranjang ({calculateCartQuantity()})</span>
          </button>
        </div>
        <div className="flex flex-wrap justify-between mb-6">
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            />
          </label>
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            >
              <option value="Id">Normal</option>
              <option value="name">Nama</option>
              <option value="price">Harga</option>
              <option value="stock">Stok</option>
              <option value="color">Warna</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Sort order:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.Id}
              className="relative bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Rp {product.price}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-gray-500 hover:text-blue-500 focus:outline-none"
                      onClick={() => handleInfo(product)}
                    >
                      <BadgeInfo size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-green-500 focus:outline-none"
                      onClick={() => handleLike(product)}
                    >
                      <ThumbsUp size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-yellow-500 focus:outline-none"
                      onClick={() => handleComment(product)}
                    >
                      <MessageCircleMore size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-yellow-500 focus:outline-none"
                      onClick={() => handleSend(product)}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleShowForm(product)}
              >
                <Edit size={18} />
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleDelete(product)}
              >
                <Trash2 size={18} />
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform transition-transform duration-300 hover:scale-105"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <form onSubmit={editMode ? handleEdit : handleAdd}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stok
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL Gambar
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Warna
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={newProduct.color}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Keranjang Belanja</h2>
              <button
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                onClick={() => setShowCart(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="divide-y divide-gray-300">
              {cart.map((item) => (
                <div
                  key={item.Id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Rp {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-500 hover:text-blue-500 focus:outline-none"
                      onClick={() => decreaseQuantity(item.Id)}
                    >
                      <Minus size={18} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-blue-500 focus:outline-none"
                      onClick={() => increaseQuantity(item.Id)}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-500 focus:outline-none"
                      onClick={() => removeFromCart(item.Id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <p className="text-xl font-bold">Total: Rp {calculateTotal()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
