  "use client";

  import { useState } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import type { CategoryCard } from "@/lib/home-data";

  interface CategoryCardProps {
    category: CategoryCard;
    featured?: boolean;
  }

  export default function CategoryCardComponent({
    category,
    featured = false,
  }: CategoryCardProps) {
    const [isHovering, setIsHovering] = useState(false);
    console.log("This is Cateory", category);
    console.log(category.image);

    return (
      <Link href={category.link} className="group block">
        <div
          className={`relative overflow-hidden group cursor-pointer ${
            featured ? "aspect-[4/5] max-w-lg mx-auto" : "aspect-[3/4]"
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 600px"
                  : "(max-width: 768px) 50vw, 400px"
              }
              priority={featured}
              className={`object-cover object-center transition-transform duration-700 ease-out ${
                isHovering ? "scale-110" : "scale-100"
              }`}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0  bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            {/* Text container */}
            <div className="text-center">
              {/* Subtitle */}
              {category.subtitle && (
                <p className="text-white text-sm sm:text-base font-light mb-2 opacity-90">
                  {category.subtitle}
                </p>
              )}

              {/* Title with border */}
              <div className="inline-block mx-auto mb-4 sm:mb-6">
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-serif px-6 sm:px-8 py-3 sm:py-4 border-2 border-white">
                  {category.title}
                </h2>
              </div>

              {/* Shop now button */}
              <div className="mt-2">
                <span className="inline-block bg-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium hover:bg-opacity-90 transition-colors">
                  {category.buttonText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
