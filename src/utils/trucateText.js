export default function(str, qtd) {
    return str.length > 10 ? str.substring(0, qtd) + "..." : str;
}