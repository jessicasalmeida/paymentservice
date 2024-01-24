# fiap_restaurante

Preparação ambiente
-Banco de Dados: docker-compose -f docker-compose.yml up
-Aplicação Imagem: docker build -t jessicasalmeida/restaurante .
-Aplicação Run: docker run -d -p 5000:8000 jessicasalmeida/restaurante
-Execução Local: npm run dev

Links:
MONGODB_EXPRESS: http://localhost:8081/db/restaurante_db
MONGO: http://localhost:27017

Executando a aplicação
-Collection Postman fiap_restaurante, esta divida em user, products, cart e order.

USER
createUser: /users
-Exemplo:
    {
        "name": "John Doe2",
        "email": "john.doe@example.com"
    }
getUserById: /users/:id
-Exemplo:
    users/65ad86e5c8f936abc7bb2fb3 (TIP: Copie o ID do createUser e o insira na URL)

PRODUCTS

CART

USER





