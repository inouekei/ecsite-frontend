<template>
  <div class="all">
    <CommonHeader />
    <Nuxt class="main"/>
    <CommonFooter />
  </div>
</template>
<style>
.all{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main{
  flex: 1;
}
</style>
