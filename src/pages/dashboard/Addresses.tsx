import { useState } from 'react';
import { Plus, MapPin, Edit2, Trash2, Check, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AddressType = 'home' | 'office';

interface Address {
  id: string;
  label: string;
  type: AddressType;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    label: 'Home',
    type: 'home',
    fullName: 'John Doe',
    phone: '+880 1234 567890',
    address: '123 Main Street, Apt 4B',
    city: 'Dhaka',
    postalCode: '1205',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    type: 'office',
    fullName: 'John Doe',
    phone: '+880 1234 567891',
    address: '456 Business Tower, Floor 10',
    city: 'Dhaka',
    postalCode: '1212',
    isDefault: false,
  },
];

const emptyAddress: Omit<Address, 'id'> = {
  label: '',
  type: 'home',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  isDefault: false,
};

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Omit<Address, 'id'> & { id?: string }>(emptyAddress);

  const handleSave = async () => {
    if (!editingAddress.fullName || !editingAddress.address || !editingAddress.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingAddress.id) {
      // Update existing
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddress.id ? { ...editingAddress, id: a.id } as Address : a))
      );
      toast.success('Address updated successfully!');
    } else {
      // Add new
      const newAddress: Address = {
        ...editingAddress,
        id: Date.now().toString(),
      };
      setAddresses((prev) => [...prev, newAddress]);
      toast.success('Address added successfully!');
    }

    setIsEditing(false);
    setEditingAddress(emptyAddress);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success('Address deleted successfully!');
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success('Default address updated!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Address Book</h2>
        <Button
          onClick={() => {
            setEditingAddress(emptyAddress);
            setIsEditing(true);
          }}
        >
          <Plus size={18} className="mr-2" />
          Add Address
        </Button>
      </div>

      {/* Add/Edit Address Form */}
      {isEditing && (
        <div className="mb-6 p-6 bg-surface rounded-xl border border-border animate-fade-in">
          <h3 className="font-semibold text-foreground mb-4">
            {editingAddress.id ? 'Edit Address' : 'Add New Address'}
          </h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={editingAddress.label}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="e.g., Home, Office"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={editingAddress.type === 'home' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEditingAddress((prev) => ({ ...prev, type: 'home' }))}
                  >
                    <Home size={16} className="mr-2" />
                    Home
                  </Button>
                  <Button
                    type="button"
                    variant={editingAddress.type === 'office' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEditingAddress((prev) => ({ ...prev, type: 'office' }))}
                  >
                    <Building size={16} className="mr-2" />
                    Office
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={editingAddress.fullName}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={editingAddress.phone}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+880 1234 567890"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address *</Label>
              <Input
                value={editingAddress.address}
                onChange={(e) =>
                  setEditingAddress((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Street address, apartment, suite, etc."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  value={editingAddress.city}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Dhaka"
                />
              </div>
              <div className="space-y-2">
                <Label>Postal Code</Label>
                <Input
                  value={editingAddress.postalCode}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({ ...prev, postalCode: e.target.value }))
                  }
                  placeholder="1205"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave}>Save Address</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingAddress(emptyAddress);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">No saved addresses</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                'p-4 rounded-xl border transition-colors',
                address.isDefault
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-surface hover:border-primary/50'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {address.type === 'home' ? (
                    <Home size={18} className="text-primary" />
                  ) : (
                    <Building size={18} className="text-primary" />
                  )}
                  <span className="font-semibold text-foreground">{address.label || address.type}</span>
                  {address.isDefault && (
                    <Badge className="bg-primary/10 text-primary text-xs">Default</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(address)}>
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-foreground space-y-1">
                <p className="font-medium">{address.fullName}</p>
                <p className="text-muted-foreground">{address.phone}</p>
                <p className="text-muted-foreground">{address.address}</p>
                <p className="text-muted-foreground">
                  {address.city} {address.postalCode}
                </p>
              </div>

              {!address.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-primary hover:text-primary"
                  onClick={() => handleSetDefault(address.id)}
                >
                  <Check size={14} className="mr-1" />
                  Set as Default
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
