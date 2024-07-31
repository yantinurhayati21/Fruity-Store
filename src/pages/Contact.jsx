import { Mail, Phone, MapPin, Linkedin, Instagram, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-200 flex items-center justify-center py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Contact Me
        </h1>

        {/* Email */}
        <div className="flex items-center mb-4">
          <Mail size={36} className="text-blue-500" />
          <span className="ml-4 text-xl font-semibold w-24">Email</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            <a
              href="mailto:yantinurhayati051@gmail.com"
              className="text-blue-500 hover:underline"
            >
              yantinurhayati051@gmail.com
            </a>
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center mb-4">
          <Phone size={36} className="text-green-500" />
          <span className="ml-4 text-xl font-semibold w-24">Phone</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            <a
              href="https://wa.me/6285321840790"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              +62 853-2184-0790 (WhatsApp)
            </a>
          </p>
        </div>

        {/* Address */}
        <div className="flex items-center mb-4">
          <MapPin size={36} className="text-purple-500" />
          <span className="ml-4 text-xl font-semibold w-24">Address</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            Bandung, Jawa Barat, Indonesia
          </p>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center mb-4">
          <Linkedin size={36} className="text-blue-500" />
          <span className="ml-4 text-xl font-semibold w-24">LinkedIn</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            <a
              href="https://www.linkedin.com/in/yanti-nurhayati-6736192a6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              linkedin.com/in/yanti-nurhayati-6736192a6
            </a>
          </p>
        </div>

        {/* Instagram */}
        <div className="flex items-center mb-4">
          <Instagram size={36} className="text-pink-500" />
          <span className="ml-4 text-xl font-semibold w-24">Instagram</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            <a
              href="https://www.instagram.com/yantinrh.21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              yantinrh.21
            </a>
          </p>
        </div>

        {/* GitHub */}
        <div className="flex items-center mb-4">
          <Github size={36} className="text-gray-800" />
          <span className="ml-4 text-xl font-semibold w-24">GitHub</span>
          <p className="text-gray-700 leading-relaxed flex-1">
            <a
              href="https://github.com/yantinurhayati21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline"
            >
              github.com/yantinurhayati21
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
