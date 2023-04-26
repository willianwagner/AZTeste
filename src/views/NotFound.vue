<template>
    <div class="error-container">
        <h1>OPS... <br />Parece que as coisas não deram certo por aqui.</h1>
        <p>Volta lá para o inicio e vamos tentar de novo =)</p>
        <router-link to="/">Ir para Início</router-link>
    </div>
</template>
<style scoped>
.error-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #555;
}


p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 30px;
    color: #777;
}


a {
    display: inline-block;
    padding: 10px 20px;
    background-color: green;
    font-size: 12px;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

a:hover {
    background-color: #333;
}
</style>