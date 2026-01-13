import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const album = albums.find(a => a.id === parseInt(albumId));

  if (!album) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Albom Tapılmadı</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const artistSlug = album.artist.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Album Cover at Top */}
          <div className="relative mb-8">
            <div className="aspect-square w-full rounded-xl overflow-hidden shadow-2xl">
              {album.image && !imageError ? (
                <img 
                  src={album.image} 
                  alt={`${album.title} cover`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-card border border-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Şəkil yüklənə bilmədi</p>
                  </div>
                </div>
              )}
            </div>

            {/* Details Overlay at Bottom Center of Cover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
              <div className="text-center">
                {album.isNew && (
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
                    YENI BURAXILIŞ
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3">
                  {album.title}
                </h1>
                
                <Link 
                  to={`/artist/${artistSlug}`}
                  className="text-xl md:text-2xl text-white/90 hover:text-primary transition-colors inline-block mb-4"
                >
                  {album.artist}
                </Link>
                
                <div className="flex items-center justify-center gap-3 text-sm md:text-base text-white/80">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                  <span>•</span>
                  <span className="capitalize">{album.vinylColor} Vinyl</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Purchase Section */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              {album.description}
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-4xl font-serif font-bold mb-6 text-center">{album.price} ₼</p>
              
              <div className="flex gap-4 max-w-md mx-auto">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Səbətə əlavə et
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-serif font-bold mb-4 text-center">Məhsul Haqqında</h3>
              <ul className="space-y-2 text-muted-foreground max-w-md mx-auto">
                <li>• Orijinal vinil qeyd</li>
                <li>• {album.vinylColor} rəng vinil</li>
                <li>• Yüksək keyfiyyətli audio</li>
                <li>• Sınmaz qablaşdırma ilə göndərilir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;