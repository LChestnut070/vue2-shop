<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorlist" :key="item.id" :list="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.getFloorList
  },
  computed: {
    ...mapActions('m_home', ['getFloorList']),
    ...mapState('m_home', ['floorlist'])
  }

}
</script>

<style></style>
