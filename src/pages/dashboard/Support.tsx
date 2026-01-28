import { useState } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
type TicketPriority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  replies: number;
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Order not received',
    message: 'My order ORD-2024-001 was supposed to be delivered yesterday but I havent received it yet.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-26',
    replies: 2,
  },
  {
    id: 'TKT-002',
    subject: 'Refund request',
    message: 'I would like to request a refund for my recent purchase.',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-27',
    updatedAt: '2024-01-27',
    replies: 0,
  },
  {
    id: 'TKT-003',
    subject: 'Product quality issue',
    message: 'The product I received has some defects.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-24',
    replies: 4,
  },
];

const statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }> = {
  open: { label: 'Open', color: 'bg-warning/10 text-warning', icon: AlertCircle },
  in_progress: { label: 'In Progress', color: 'bg-primary/10 text-primary', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-success/10 text-success', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-muted text-muted-foreground', icon: CheckCircle },
};

const priorityColors: Record<TicketPriority, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning/10 text-warning',
  high: 'bg-destructive/10 text-destructive',
};

export default function Support() {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    priority: 'medium' as TicketPriority,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Support ticket created successfully!');
    setFormData({ subject: '', priority: 'medium', message: '' });
    setIsCreating(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Support Tickets</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus size={18} className="mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Create Ticket Form */}
      {isCreating && (
        <div className="mb-6 p-6 bg-surface rounded-xl border border-border animate-fade-in">
          <h3 className="font-semibold text-foreground mb-4">Create New Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: TicketPriority) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Describe your issue in detail..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Submit Ticket</Button>
              <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tickets List */}
      {mockTickets.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">No support tickets</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockTickets.map((ticket) => {
            const status = statusConfig[ticket.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={ticket.id}
                className="p-4 bg-surface rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                      <Badge className={cn('text-xs', priorityColors[ticket.priority])}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground truncate">{ticket.subject}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {ticket.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span>{ticket.replies} replies</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={cn('gap-1', status.color)}>
                      <StatusIcon size={12} />
                      {status.label}
                    </Badge>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
