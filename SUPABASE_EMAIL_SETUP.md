# Configuração da Edge Function para Envio de Emails

Para que o sistema de emails funcione, você precisa criar uma Edge Function no Supabase.

## 1. Criar a Edge Function

No seu projeto Supabase, vá para **Edge Functions** e crie uma nova função chamada `send-email`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, to, partnerData } = await req.json()

    let emailContent = ''
    let subject = ''

    switch (type) {
      case 'new_partner_notification':
        subject = 'Nova Solicitação de Parceria - ConverseIA'
        emailContent = `
          <h2>Nova Solicitação de Parceria</h2>
          <p><strong>Nome:</strong> ${partnerData.name}</p>
          <p><strong>Email:</strong> ${partnerData.email}</p>
          <p><strong>Empresa:</strong> ${partnerData.company_name}</p>
          <p><strong>Tipo:</strong> ${partnerData.company_type}</p>
          ${partnerData.phone ? `<p><strong>Telefone:</strong> ${partnerData.phone}</p>` : ''}
          <p><a href="${Deno.env.get('SITE_URL')}/parceria/admin">Acessar Painel Admin</a></p>
        `
        break

      case 'partner_approved':
        subject = '🎉 Sua conta de parceiro foi aprovada - ConverseIA'
        emailContent = `
          <h1>🎉 Parabéns!</h1>
          <p>Olá <strong>${partnerData.name}</strong>,</p>
          <p>Sua solicitação para se tornar parceiro da ConverseIA foi aprovada!</p>
          <p><a href="${Deno.env.get('SITE_URL')}/parceria/login">Acessar Meu Painel</a></p>
        `
        break

      case 'partner_rejected':
        subject = 'Atualização sobre sua solicitação de parceria - ConverseIA'
        emailContent = `
          <h2>Atualização sobre sua solicitação</h2>
          <p>Olá <strong>${partnerData.name}</strong>,</p>
          <p>Não foi possível aprovar sua solicitação no momento.</p>
          <p>Você pode enviar uma nova solicitação no futuro.</p>
        `
        break
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ConverseIA <noreply@converseia.com>',
        to: [to],
        subject: subject,
        html: emailContent,
      }),
    })

    const data = await res.json()

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
```

## 2. Configurar Variáveis de Ambiente

No Supabase, configure as seguintes variáveis:

- `RESEND_API_KEY`: Sua chave da API do Resend
- `SITE_URL`: URL do seu site (ex: https://seusite.com)

## 3. Alternativa com SendGrid

Se preferir usar SendGrid:

```typescript
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')

const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SENDGRID_API_KEY}`,
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: 'noreply@converseia.com', name: 'ConverseIA' },
    subject: subject,
    content: [{ type: 'text/html', value: emailContent }],
  }),
})
```

## 4. Testar a Edge Function

Após criar e fazer deploy, teste chamando:

```javascript
const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    type: 'new_partner_notification',
    to: 'victor@talka.tech',
    partnerData: {
      name: 'Teste',
      email: 'teste@teste.com',
      company_name: 'Empresa Teste',
      company_type: 'Teste'
    }
  }
})
```
