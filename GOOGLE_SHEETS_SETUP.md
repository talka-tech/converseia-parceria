# Configuração do Google Sheets para ConverseIA Parceria

## Passos para configurar a integração com Google Sheets

### 1. Criar um projeto no Google Cloud Platform

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google Sheets:
   - Vá para "APIs & Services" > "Library"
   - Procure por "Google Sheets API" e ative

### 2. Criar uma conta de serviço

1. Vá para "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "Service Account"
3. Preencha os dados da conta de serviço
4. Na etapa de "Grant this service account access to project", adicione o role "Editor"
5. Clique em "Done"

### 3. Gerar chave privada

1. Na lista de contas de serviço, clique na conta criada
2. Vá para a aba "Keys"
3. Clique em "Add Key" > "Create new key"
4. Selecione o formato JSON e baixe o arquivo

### 4. Configurar a planilha Google Sheets

1. Crie uma nova planilha no Google Sheets
2. Configure a primeira aba com o nome "Clientes"
3. Adicione os cabeçalhos na primeira linha:
   ```
   A1: Nome
   B1: Email
   C1: Telefone
   D1: Empresa
   E1: Valor
   F1: Status
   ```

### 5. Compartilhar a planilha

1. Clique em "Compartilhar" na planilha
2. Adicione o email da conta de serviço (client_email do JSON) como editor
3. Copie o ID da planilha da URL (entre '/d/' e '/edit')

### 6. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_GOOGLE_SHEET_ID=seu_sheet_id_aqui
VITE_GOOGLE_PROJECT_ID=seu_project_id
VITE_GOOGLE_PRIVATE_KEY_ID=seu_private_key_id
VITE_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua_private_key_aqui\n-----END PRIVATE KEY-----\n"
VITE_GOOGLE_CLIENT_EMAIL=sua_conta_de_servico@projeto.iam.gserviceaccount.com
VITE_GOOGLE_CLIENT_ID=seu_client_id
VITE_GOOGLE_CLIENT_CERT_URL=sua_cert_url
```

**Importante:** 
- Substitua `\n` por quebras de linha reais na private_key
- Mantenha as aspas duplas na VITE_GOOGLE_PRIVATE_KEY
- Nunca commite o arquivo .env no Git

### 7. Estrutura da planilha

A planilha deve ter a seguinte estrutura:

| Nome | Email | Telefone | Empresa | Valor | Status |
|------|-------|----------|---------|-------|---------|
| João Silva | joao@empresa.com | (11) 99999-9999 | Empresa ABC | 1500.00 | pending_payment |
| Maria Santos | maria@escritorio.com | (21) 88888-8888 | Escritório XYZ | 2000.00 | active |

### 8. Status possíveis

- `pending_payment`: Cliente aguardando pagamento
- `pending_implementation`: Pagamento feito, aguardando implementação
- `active`: Cliente ativo

### Funcionalidades implementadas

✅ **Leitura em tempo real**: Dados são carregados automaticamente do Google Sheets
✅ **Sincronização bidirecional**: Alterações no dashboard são refletidas na planilha
✅ **Botão de sincronização manual**: Para atualizar dados instantaneamente
✅ **Operações CRUD completas**: Criar, ler, atualizar e deletar clientes
✅ **Feedback visual**: Loading states e notificações de sucesso/erro

### Troubleshooting

**Erro de autenticação:**
- Verifique se a conta de serviço tem acesso à planilha
- Confirme se todas as variáveis de ambiente estão corretas
- Certifique-se de que a API do Google Sheets está ativada

**Dados não aparecem:**
- Verifique se o ID da planilha está correto
- Confirme se a aba se chama "Clientes"
- Verifique se os cabeçalhos estão na linha 1

**Erro ao salvar:**
- Confirme se a conta de serviço tem permissão de edição
- Verifique se a estrutura da planilha está correta
