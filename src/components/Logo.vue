<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.com
  </RouterLink>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo{
  display: inline-block;
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  &:hover{
    color:$black;
  }
  span{
    color:#fdc000
  }
}
</style>