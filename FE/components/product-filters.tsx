"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Slider } from "./ui/slider"

interface ProductFiltersProps {
  categories: string[]
  onFilterChange: (filters: {
    category: string
    priceRange: [number, number]
    sortBy: string
  }) => void
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState("featured")

  const handleApplyFilters = () => {
    onFilterChange({ category, priceRange, sortBy })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Category</h3>
        <RadioGroup value={category} onValueChange={setCategory}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">
              All Products
            </Label>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <RadioGroupItem value={cat} id={cat} />
              <Label htmlFor={cat} className="cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={2000000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₦{priceRange[0]}</span>
          <span>₦{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Sort By</h3>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-asc" id="price-asc" />
            <Label htmlFor="price-asc" className="cursor-pointer">
              Price: Low to High
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-desc" id="price-desc" />
            <Label htmlFor="price-desc" className="cursor-pointer">
              Price: High to Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name" id="name" />
            <Label htmlFor="name" className="cursor-pointer">
              Name
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleApplyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
