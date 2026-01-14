import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";

const ArtistPage = () => {
  const { artistName } = useParams();
  const [hoveredId, setHoveredId] = useState(null);
  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);

  const artistAlbums = albums.filter(
    album => album.artist.toLowerCase().replace(/\s+/g, '-') === artistName
  );

  const artist = artistAlbums[0]?.artist || "Artist";
  
  // Get artist banner and profile from first album (you can add these fields to your albums data)
  const artistData = artistAlbums[0] || {};
  const artistBanner = artistData.artistBanner || artistData.image; // Fallback to album cover
  const artistProfile = artistData.artistProfile || artistData.image; // Fallback to album cover

  if (artistAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Artist Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const getAccentColors = (color) => {
    const colorMap = {
      red: { border: "border-red-500/50", text: "group-hover:text-red-500" },
      blue: { border: "border-blue-500/50", text: "group-hover:text-blue-500" },
      purple: { border: "border-purple-500/50", text: "group-hover:text-purple-500" },
      green: { border: "border-green-500/50", text: "group-hover:text-green-500" },
      orange: { border: "border-orange-500/50", text: "group-hover:text-orange-500" },
      pink: { border: "border-pink-500/50", text: "group-hover:text-pink-500" },
      yellow: { border: "border-yellow-500/50", text: "group-hover:text-yellow-500" },
      amber: { border: "border-amber-600/50", text: "group-hover:text-amber-600" },
      gray: { border: "border-gray-500/50", text: "group-hover:text-gray-500" },
      default: { border: "border-primary/50", text: "group-hover:text-primary" }
    };
    return colorMap[color || "default"] || colorMap.default;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Artist Banner Section */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        {/* Banner Image */}
        {artistBanner && !bannerError ? (
          <img 
            src={artistBanner}
            alt={`${artist} banner`}
            className="w-full h-full object-cover"
            onError={() => setBannerError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-white/80 backdrop-blur-sm bg-black/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
        </div>

        {/* Artist Info - Positioned at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
          <div className="flex items-end gap-6">
            {/* Profile Picture */}
            <div className="relative">
              {artistProfile && !profileError ? (
                <img 
                  src={artistProfile}
                  alt={artist}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-2xl"
                  onError={() => setProfileError(true)}
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-card border-4 border-background shadow-2xl flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-muted-foreground">
                    {artist.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Artist Name & Stats */}
            <div className="flex-1 pb-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">İFAÇI</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-2 text-white drop-shadow-lg">
                {artist}
              </h1>
              <p className="text-lg text-white/90 drop-shadow">
                {artistAlbums.length} albom
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Albums Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-serif font-bold mb-8">Albomlar</h2>
        
        {/* Albums Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artistAlbums.map((album) => {
            const accentColors = getAccentColors(album.accentColor);
            return (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className={`group relative bg-card rounded-xl p-6 border transition-all duration-300 cursor-pointer ${accentColors.border} hover:shadow-lg block`}
                onMouseEnter={() => setHoveredId(album.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {album.isNew && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                    YENI
                  </span>
                )}

                <div className="relative h-48 flex items-center justify-center mb-6">
                  {album.image && (
                    <div className="absolute inset-0 flex items-center justify-start pl-4">
                      <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl">
                        <img 
                          src={album.image} 
                          alt={`${album.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className={`relative transition-transform duration-500 ease-out ${
                      hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                    }`}
                    style={{ marginLeft: '20px' }}
                  >
                    <VinylRecord 
                      size="md" 
                      spinning={hoveredId === album.id}
                      vinylColor={album.vinylColor}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-serif text-xl font-bold transition-colors ${accentColors.text}`}>
                          {album.title}
                        </h3>
                        {album.isExplicit && (
                          <span className="text-xs font-bold px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded">
                            E
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{album.year}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to favorites logic
                      }}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                    <Button 
                      size="sm" 
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Səbətə əlavə et
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;