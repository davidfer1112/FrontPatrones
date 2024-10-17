import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import './loginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Iniciando sesión con:', email, password)
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardHeader>
          <CardTitle className="login-title">Iniciar Sesión</CardTitle>
          <CardDescription className="login-description">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-options">
              <div className="remember-me">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Recordarme</Label>
              </div>
              <Link href="/forgot-password" className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button type="submit" className="login-button">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="login-footer">
          <p className="register-prompt">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="register-link">
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
