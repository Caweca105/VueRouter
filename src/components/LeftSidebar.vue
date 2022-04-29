<template>
  <ul>
    <li><routerlink :to="{ name: 'protected' }">Dashboard</routerlink></li>
    <li><routerlink :to="{ name: 'invoices' }">Invoices</routerlink></li>
  </ul>
</template>

<style scoped>
ul {
  background: white;
  padding: 10px;
  list-style: none;
  margin-right: 20px;
}
li {
  margin: 10px;
}
</style>
