import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/context/StoreContext';

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated } = useStore();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const success = await login(form.get('email') as string, form.get('password') as string);
    setIsLoading(false);
    if (success) navigate('/dashboard');
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const success = await register({
      email: form.get('email') as string,
      password: form.get('password') as string,
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      phone: form.get('phone') as string,
    });
    setIsLoading(false);
    if (success) navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-primary mb-2">
              <span className="bg-gradient-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center">S</span>
              ShopVerse
            </Link>
            <p className="text-muted-foreground">Welcome! Sign in or create an account.</p>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input name="email" type="email" placeholder="Email or Phone" className="pl-10" required />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="text-right"><Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link></div>
                  <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><Input name="firstName" placeholder="First Name" className="pl-10" required /></div>
                    <Input name="lastName" placeholder="Last Name" required />
                  </div>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><Input name="email" type="email" placeholder="Email" className="pl-10" required /></div>
                  <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><Input name="phone" placeholder="Phone Number" className="pl-10" /></div>
                  <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><Input name="password" type="password" placeholder="Password" className="pl-10" required /></div>
                  <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Account'}</Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
