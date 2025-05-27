export interface Images{
  secure_url:string,
  public_id:string,
  _id:string
}
const ImageGallery = ({ images }:{images:Images[]}) => {
  return (
    <section className="py-8 px-4">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Image Gallery</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index:number) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={src?.secure_url}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
