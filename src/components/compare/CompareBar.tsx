import { Link } from 'react-router-dom';
import { X, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/CompareContext';

export function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg animate-slide-up lg:bottom-0 pb-safe">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <GitCompare className="text-primary shrink-0" size={20} />
            <span className="text-sm font-medium text-foreground shrink-0">
              Compare ({compareList.length}/4):
            </span>
            <div className="flex gap-2">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="relative group shrink-0"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-border"
                  />
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear
            </Button>
            <Link to="/compare">
              <Button size="sm" disabled={compareList.length < 2}>
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
