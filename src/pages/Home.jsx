
import Carousel from "../components/Carousel";

export default function Home() {
    return (
        <>
            <div className="relative w-full h-screen">
                <Carousel />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
                    <h2 className="text-4xl font-bold mb-4">Selamat datang di website tugas harian</h2>
                    <p className="text-lg text-center">
                        Di sini kamu dapat mengelola dan melihat daftar tugas harianmu.
                        <br />
                        Selamat Mencoba ^.^
                    </p>
                </div>
            </div>
        </>
    );
}
