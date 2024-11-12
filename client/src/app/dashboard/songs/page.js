import SearchBar from "@/components/SearchBar";
import SongCard from "@/components/SongCard";

const Songs = () => {
  return (
    <div className="pt-5 ">
      <div className="container mx-auto flex justify-center">
        <SearchBar />
      </div>
      {/* SongContent */}
      <div
        style={{ maxHeight: "calc(100vh - 180px)" }}
        className="overflow-y-scroll"
      >
        <div className="mt-2 px-12 min-h-max">
          {/* // songs */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5">Songs</h2>

            <div className="overflow-scroll scroll-smooth">
              <div className="flex gap-8  min-w-max  ">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </div>
            </div>
          </div>
          {/* albums */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5">Songs</h2>

            <div className="overflow-scroll scroll-smooth">
              <div className="flex gap-8  min-w-max  ">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </div>
            </div>
          </div>
          {/* playlist */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5">Songs</h2>

            <div className="overflow-scroll scroll-smooth">
              <div className="flex gap-8  min-w-max  ">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songs;
