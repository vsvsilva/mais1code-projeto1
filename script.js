const carrinho = [
    {
        id: 1,
        imagem: "imagem01.jpg",
        nome: "Sapato 01",
        quantidade: 1,
        preco: 100.00,
    },
    {
        id: 2,
        imagem: "imagem02.jpg",
        nome: "Sapato 02",
        quantidade: 2,
        preco: 90.00,
    },
    {
        id: 3,
        imagem: "imagem03.jpg",
        nome: "Sapato 03",
        quantidade: 3,
        preco: 85.00,
    },
    {
        id: 4,
        imagem: "imagem04.jpg",
        nome: "Sapato 04",
        quantidade: 4,
        preco: 70.00,
    },
    {
        id: 5,
        imagem: "imagem05.jpg",
        nome: "Sapato 05",
        quantidade: 5,
        preco: 65.00,
    },
];

localStorage.setItem(
    "carrinho", JSON.stringify( carrinho )
);

const carrinhoElemento = document.getElementById( "lista-do-carrinho" );
const totalElemento = document.getElementById( "total" );
const strongTotal = document.createElement( "strong" );
const listaProdutosCarrinhoJson = localStorage.getItem("carrinho") || "[]";
const listaProdutosCarrinho = JSON.parse( listaProdutosCarrinhoJson );

function calcularTotal( id = 0 ) {
    return listaProdutosCarrinho.reduce(
        ( acumulador, item ) => {
            if ( item.id !== id ) {
                return acumulador + calcularSubTotal( item.quantidade, item.preco );
            }

            return acumulador;
        },
        0
    );
}

function formatarMoeda( numero ) {
    return numero.toLocaleString(
        "pt-br",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}

let soma02 = calcularTotal();

// @ts-ignore
totalElemento.textContent = "Total: ";
strongTotal.textContent = formatarMoeda( soma02 );

totalElemento?.appendChild( strongTotal );

for ( const item of listaProdutosCarrinho ) {
    const li = document.createElement( "li" );
    const img = document.createElement( "img" );
    const h2 = document.createElement( "H2" );
    const quantidade = document.createElement( "p" );
    const strongQtd = document.createElement( "strong" );
    const strongSubTotal = document.createElement( "strong" );
    const preco = document.createElement( "p" );
    const subTotal = document.createElement( "p" );
    const remover = document.createElement( "button" );
    const adicionar = document.createElement( "button" );

    li.id = `${item.id}`;

    img.src = item.nome;

    h2.textContent = item.nome;
    quantidade.textContent = "Quantidade: ";
    strongQtd.id = `qtd-item-${item.id}`;
    strongQtd.textContent = `${item.quantidade}`;

    preco.textContent = `Unidade: ${formatarMoeda( item.preco )}`;

    subTotal.textContent = "Subtotal: ";
    strongSubTotal.id = `subtotal-item-${item.id}`;
    const subTotalNumero = calcularSubTotal( item.quantidade, item.preco );
    strongSubTotal.textContent = formatarMoeda( subTotalNumero );

    remover.textContent = "Remover";
    remover.setAttribute( "class", "btn-remover" );

    adicionar.textContent = "Adicionar";
    adicionar.setAttribute( "class", "btn-adicionar" );

    remover.addEventListener( "click", () => removerUnidade( item.id ) );
    adicionar.addEventListener( "click", () => adicionarUnidade( item.id ) );

    li.appendChild( img );
    li.appendChild( h2 );
    li.appendChild( quantidade );
    quantidade.appendChild( strongQtd );
    li.appendChild( preco );
    li.appendChild( subTotal );
    subTotal.appendChild( strongSubTotal );
    li.appendChild( remover );
    li.appendChild( adicionar );

    carrinhoElemento?.appendChild( li );
}

function calcularSubTotal( quantidade, preco ) {
    return quantidade * preco;
}

function obterElemento( elem, id ) {
    const idQtd = `${elem}-item-${id}`;

    return document.getElementById( idQtd );
}

function obterQuantidade( qtdTexto ) {
    return Number( qtdTexto );
}

function removerUnidade( id ) {
    const totalElemento = document.querySelector( "#total>strong" );
    const total = calcularTotal( id );
    const item = listaProdutosCarrinho.find( el => el.id === id );
    const subTotalElemento = obterElemento( "subtotal", id );
    const qtdElemento = obterElemento( "qtd", id );
    const qtdTexto = qtdElemento?.textContent;

    let qtdNumero = obterQuantidade( qtdTexto );

    if ( qtdNumero <= 0 ) return;

    qtdNumero -= 1;

    listaProdutosCarrinho.forEach(
        elem => {
            if ( elem.id === id ) {
                elem.quantidade = qtdNumero;
            }
        } );

    let subTotal = calcularSubTotal( qtdNumero, item?.preco );

    // @ts-ignore
    qtdElemento.textContent = String( qtdNumero );
    // @ts-ignore
    subTotalElemento.textContent = formatarMoeda( subTotal );
    // @ts-ignore
    totalElemento.textContent = formatarMoeda( total + subTotal );
}

function adicionarUnidade( id ) {
    const totalElemento = document.querySelector( "#total>strong" );
    const total = calcularTotal( id );
    const item = listaProdutosCarrinho.find( el => el.id === id );
    const subTotalElemento = obterElemento( "subtotal", id );
    const qtdElemento = obterElemento( "qtd", id );
    const qtdTexto = qtdElemento?.textContent;

    let qtdNumero = obterQuantidade( qtdTexto );

    qtdNumero += 1;

    listaProdutosCarrinho.forEach(
        elem => {
            if ( elem.id === id ) {
                elem.quantidade = qtdNumero;
            }
        } );

    let subTotal = calcularSubTotal( qtdNumero, item?.preco );

    // @ts-ignore
    qtdElemento.textContent = String( qtdNumero );
    // @ts-ignore
    subTotalElemento.textContent = formatarMoeda( subTotal );
    // @ts-ignore
    totalElemento.textContent = formatarMoeda( total + subTotal );
}
