<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-toolbar-title>
          Hangman
        </q-toolbar-title>
        <!--<q-btn-->
        <!--flat-->
        <!--dense-->
        <!--label="New Game"-->
        <!--@click="leftDrawer = !leftDrawer"-->
        <!--/>-->
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    // name: 'LayoutName',
    data() {
      return {
        leftDrawer: true
      }
    },

  }
</script>

<style>
</style>
