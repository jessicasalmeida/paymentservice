# fiap_restaurante

-------------Preparando o ambiente------------
-Aplicação Imagem: docker build -t jessicasalmeida/restaurante .
-Banco de Dados Run: docker-compose -f docker-compose.yml up -d
-Execução Local: npm run dev

Links:
MONGODB_EXPRESS: http://localhost:8081/db/restaurante_db
MONGO: http://localhost:27017

-------------Testando a aplicação-------------
-Collection Postman fiap_restaurante, esta divida em user, products, cart e order.
-Na collection fiap_restaurante do postman existe uma variavel configurada que pode ser editada a porta 5000 para ambiente docker e 8000 para local (não esqueça de salvar ao editar ;D)


-------------Aplicação------------------------

--Gestão de Products--

*getAllProducts: /product
(TIP: para melhor testabilidade do professor este método carrega os produtos no banco de dados)

*createProduct: /product/
--Exemplo:
    {
        "name": "Sorvete Misto",
        "options": [],
        "category": "sobremesa",
        "price": 10,
        "timeToPrepare": 2,
        "status": true
    }
(TIP: salve o ID caso queira usar posteriormente)

*getProductById: /product/:id
-Exemplo: produto/65aeffe53cb25a62bcec76f7

*updateProductById: /product/:id
--Exemplo: produto/65aeffe53cb25a62bcec76f7
    {
        "name": "Sorvete Misto G",
        "options": [],
        "category": "sobremesa",
        "price": 10,
        "timeToPrepare": 2,
        "status": true
    }
*deleteProductById: /product/:id
--Exemplo: produto/65aeffe53cb25a62bcec76f7
Politica: Um produto só pode ser excluido/desativado se não estiver em nenhuma order ativa. 
Para testar que está em uma order ativa adicione o produto no carrinho e o avance com a API receiveOrder,
neste momento o pedido esta ativo e o produto não poderá ser excluido

*deactivateProductById: /product/deactive/:id
--Exemplo: produto/65aeffe53cb25a62bcec76f7
Politica: Um produto só pode ser excluido/desativado se não estiver em nenhuma order ativa

*getProductByCategory: /product/categoria/:categoria
--Exemplo: produto/combo; produto/lanche; produto/bebida; produto/sobremesa; produto/acompanhamento
(TIP: EndPoint criado para filtro de products para composição do cart)

--Gestão de Users--
USER
*createUser: /users
--Exemplo:
    {
        "cpf": "000.000.000-00",
        "name": "Jessica",
        "email": "jessica.jessica@example.com"
    }
*getUserById: /users/:id
--Exemplo:
    users/65ad86e5c8f936abc7bb2fb3 (TIP: Copie o ID do createUser e o insira na URL)

--Gestão de Cart--
*createCart: /cart/
(TIP: Copie o ID do cart para usar nos próximos passos)

*addUser: /cart/user/:id
query.param: user
--Exemplo: /cart/user/65b19e8f5fe107d74bd05ce0?user=65ad86e5c8f936abc7bb2fb3

*addProduct: /cart/product/:id
query.param: produto
--Exemplo: /cart/product/65b19e8f5fe107d74bd05ce0?product=65b1a124e453756a9567b9c7
(TIP: Ao adicionar use getProductByCategory para verificar quais os produtos da categoria pretendida)
(Policies: A cada combo selecionado, possui direito a 1 bebida e 1 acompanhamento incluso no valor do combo, logo este itens terão seu valor zerado no carrinho)

*personalizeItens: /cart/itens/:id
query.param: produto
query.param: options
--Exemplo: /cart/itens/65b19e8f5fe107d74bd05ce0?product=65b1a124e453756a9567b9c7&observacoes=["Pão Australiano","Hamburguer","Queijo Emental","Alface Americana","Molho Tasty","Cebola","Tomate"]

*resumeCart: /cart/:id
--Exemplo: /cart/65b19e8f5fe107d74bd05ce0

*closeCart: /cart/close/:id
--Exemplo: /cart/close/65b19e8f5fe107d74bd05ce0

*payCart: /cart/pay/:id
--Exemplo: /cart/pay/65b19e8f5fe107d74bd05ce0

*sendToKitchen: /cart/kitchen/:id
--Exemplo: /cart/kitchen/65b19e8f5fe107d74bd05ce0

*cancelCart: /cart/cancel/:id
--Exemplo: /cart/cancel/65b19e8f5fe107d74bd05ce0

--Gestão de ORDER--
receiveOrder: /order/receive/:id
--Exemplo: /order/receive/65b19e8f5fe107d74bd05ce0
(TIP: Agora você esta manipulando a order. Copie e cole o id da order para sequencia das proximas)

prepareOrder: /order/prepare/:id
--Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52

estimateDelivery: /order/estimate/:id
--Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52
(Policies: Nesta etapa é validada a fila de pedidos ativos, diferente de closed e ready e somada as estimativas de preparo de todos os pedidos anteriores ao atual)

updateStatusToReady: /order/update/ready/:id
--Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52

updateStatusToDelivered: /order/update/delivered/:id
--Exemplo: /order/update/delivered/65b1a8b7f56e976b1536bf52

updateStatusToClosed: /order/update/closed/:id
--Exemplo: /order/update/closed/65b1a8b7f56e976b1536bf52

getAllActiveOrders: /order/

