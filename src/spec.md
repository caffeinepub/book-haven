# Specification

## Summary
**Goal:** Debug and fix the book display issue preventing the 12-book catalog from rendering on the webpage.

**Planned changes:**
- Add comprehensive console logging to BookCatalog component to debug catalog data, filtered books, coverImages mapping, and rendering errors
- Verify backend getBookCatalog query returns all 12 books with correct data and add backend logging if needed
- Fix coverImages mapping to ensure all 12 book titles exactly match mapping keys and verify image paths exist
- Add error boundary or fallback UI to display helpful error messages when books fail to load
- Ensure SampleBooks component correctly uses useGetBookCatalog hook and renders all 12 books in grid layout

**User-visible outcome:** All 12 books (4 Thriller, 4 Romantic, 4 Ghost) display correctly on the webpage with cover images, titles, authors, and prices. If books fail to load, users see a clear error message explaining the issue.
