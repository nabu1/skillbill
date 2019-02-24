<template src="./Base.html"></template>

<script>
import Search from '../../components/Search/Search.vue'
import Table from '../../components/Table/Table.vue'
import Navi from '../../components/Navi/Navi.vue'

export default {
  components: {
    'skillbill-navi': Navi,
    'skillbill-search': Search,
    'skillbill-table': Table,
  },
}
</script>
