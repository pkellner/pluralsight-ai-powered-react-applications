"use client";
import React, { ReactElement, useState } from "react";
import {generateAds} from "./actions/generate-images";

interface Ad {
  image: string;
}

const HOLIDAYS = [
  "New Year's Day",
  "Martin Luther King Jr. Day",
  "Presidents' Day",
  "Memorial Day",
  "Independence Day",
  "Labor Day",
  "Columbus Day",
  "Veterans Day",
  "Thanksgiving",
  "Christmas",
];

const PRODUCTS = [
  "Basketball",
  "Football",
  "Baseball Bat",
  "Tennis Racket",
  "Hockey Stick",
  "Golf Clubs",
  "Running Shoes",
  "Soccer Ball",
];

const STYLES = ["vivid", "natural"];

const QUALITIES = ["standard", "hd"];

export default function AdGenerator(): ReactElement {
  const [holiday, setHoliday] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [ads, setAds] = useState<Ad[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleGenerateAds = async () => {
    if (!holiday || !productName) {
      alert("Please select a holiday and a product.");
      return;
    }
    setAds(null); setProgress(1); setLoading(true);
    try {
      const adsArray: Ad[] = [];
      const totalAds = 3;
      const promises = Array.from({ length: totalAds }, (_, index) =>
          generateAds(holiday, productName, style, quality, instructions)
              .then((generated) => {
                setProgress(index + 2);
                if (generated && generated.length > 0) {
                  adsArray.push(generated[0]);
                }
              })
              .catch((error) => {
                console.error(`Ad generation failed for index ${index + 1}:`, error);
              })
      );
      await Promise.allSettled(promises);
      setAds(adsArray);
    } catch (error) {
      console.error("Error generating ads:", error);
      alert("An error occurred while generating ads. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = (base64Image: string, index: number) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${base64Image}`;
    link.download = `ad_${index + 1}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Holiday Ad Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="holiday"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Select a Holiday
            </label>
            <select
              id="holiday"
              value={holiday}
              onChange={(e) => setHoliday(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Holiday --</option>
              {HOLIDAYS.map((holidayItem) => (
                <option key={holidayItem} value={holidayItem}>
                  {holidayItem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="productName"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Select a Product
            </label>
            <select
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Product --</option>
              {PRODUCTS.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="style"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Style
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Style --</option>
              {STYLES.map((styleItem) => (
                <option key={styleItem} value={styleItem}>
                  {styleItem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quality"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Quality
            </label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Quality --</option>
              {QUALITIES.map((qualityItem) => (
                <option key={qualityItem} value={qualityItem}>
                  {qualityItem}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="instructions"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Optional Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Include a discount code or a holiday greeting..."
              rows={3}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleGenerateAds}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Ads"}
          </button>
        </div>

        {loading && (
          <div className="text-center mt-4">
            <span className="text-gray-700 font-semibold">
              Generating {progress} of 3 images...
            </span>
            <button
              className="inline-block ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
        )}

        {ads && ads.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Generated Ads
            </h2>
            <div className="flex justify-center space-x-8">
              {ads.map((ad, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={`data:image/png;base64,${ad.image}`}
                    alt={`Ad ${index + 1}`}
                    className="w-48 h-48 object-cover border rounded-lg shadow"
                  />
                  <button
                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded mt-3 hover:bg-green-700"
                    onClick={() => handleDownload(ad.image, index)}
                  >
                    Download Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
