<template>
  <div>
    <p>Cake {{ $route.params.id }}</p>
    <p>{{ brideCakeList }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brideCakeList: [],
    }
  },
  mounted() {
    console.log(this.brideCakeList)
    this.readFromRealtimeDb()
  },
  methods: {
    readFromRealtimeDb() {
      // const listRef =
      this.$fire.database.ref('list/').once('value', function (snapshot) {
        const data = snapshot.val()
        console.log(data)
        console.log(this.brideCakeList)
        this.brideCakeList = snapshot.val()
      })
      // console.log('listRef :>> ', listRef)
      // try {
      //   const snapshot = await listRef.child(0)
      //   alert(snapshot.get())
      //   alert(snapshot.val().message)
      // } catch (e) {
      //   alert(e)
      // }
    },
  },
}
</script>
