#language: pt

Funcionalidade: Fazer logins corretamente
	Objetivo: Fazer logins corretamente em todos os perfis

@logins
Cenário: Acesso liberado para o perfil SOLICITANTE
	Dado que acesso a pagina de parcerias 
	Quando me logo como SOLICITANTE
	Então devo visualizar a lista de pedidos
