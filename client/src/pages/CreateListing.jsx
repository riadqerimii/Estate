function CreateListing() {
  return (
    <main className=" max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a post</h1>
      <form className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="65"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg"
            required
          />
          {/* number */}
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            className="border p-1 rounded-lg"
            required
            maxLength="16"
            minLength="7"
          />
          <div className="flex gap-7 flex-wrap justify-between my-3 p-3">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnish" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between p-3  gap-6">
            <div className="flex item-center  gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex item-center  gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex flex-wrap  gap-3 justify-between">
              <div className="flex-col flex self-center ">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  required
                  className="p-3 border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center ">
                  <p>Regular Price</p>
                  <span className="text-xs">(Euro / month)</span>
                </div>
              </div>
              <div className="flex-col  gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  required
                  className="p-3 border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center ">
                  <p>Discounted Price</p>
                  <span className="text-xs">(Euro / month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold ">
            Images:
            <span className=" font-normal text-gray-700 ml-2">
              The first image will be cover (max 6){" "}
            </span>
          </p>
          <div className="flex gap-2 mt-7 ">
            <input
              className="p-4 cursor-pointer border border-red-700 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green border border-green-700 rounded uppercase hover:shadow-lg bg-green-600 text-white hover:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 hover:shadow-lg disabled:opacity-50">
            Create Post
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
