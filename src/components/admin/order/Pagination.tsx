'use client';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredOrders: any[]; 
  itemsPerPage: number;
  startIndex: number;
}

export function Pagination({ currentPage, totalPages, setCurrentPage, filteredOrders, itemsPerPage, startIndex }: PaginationProps) {
  return (
    <>
      {totalPages > 1 && (
        <div className="bg-background border-t border-border px-0 sm:px-6 py-3 sm:py-4 shadow-none">
          {/* Mobile Pagination */}
          <div className="block sm:hidden">
            <div className="text-xs text-muted-foreground text-center mb-2">
              Page {currentPage} of {totalPages} ({filteredOrders.length} total)
            </div>
            <div className="flex items-center justify-center gap-2 px-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-xs px-2"
              >
                Prev
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 2) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNumber = totalPages - 2 + i;
                  } else {
                    pageNumber = currentPage - 1 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-6 h-6 p-0 text-xs ${
                        currentPage === pageNumber 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-xs px-2"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            
            <div className="flex items-center gap-2">
              {/* First Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="hidden sm:block"
              >
                First
              </Button>
              
              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === pageNumber 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              
              {/* Last Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="hidden sm:block"
              >
                Last
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
