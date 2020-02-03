<template>
  <div id="view-stud">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{nume}}</h4></li>
      <li class="collection-item">ID#:{{stud_id}} Student</li>
      <li class="collection-item">Anul: {{anul}}</li>
      <li class="collection-item">Nota 1: {{nota1}}</li>
      <li class="collection-item">Nota 2: {{nota2}}</li>
      <li class="collection-item">Nota 3: {{nota3}}</li>
      <li class="collection-item">Media: {{media}}</li>
    </ul>
    <router-link to="/" class="btn grey">Inapoi</router-link>
    <button @click="deleteStud" class="btn red">Sterge</button>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-stud', params:{stud_id: stud_id}}" class="btn-floating
      btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-stud',
  data () {
    return {
      stud_id: null,
      nume: null,
      anul: null,
      nota1: null,
      nota2: null,
      nota3: null
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection('studenti').where('stud_id', '==', to.params.stud_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.stud_id = doc.data().stud_id
          vm.nume = doc.data().nume
          vm.anul = doc.data().anul
          vm.nota1 = doc.data().nota1
          vm.nota2 = doc.data().nota2
          vm.nota3 = doc.data().nota3
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      db.collection('studenti').where('stud_id', '==', this.$route.params.stud_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.stud_id = doc.data().stud_id
          this.nume = doc.data().nume
          this.anul = doc.data().anul
          this.nota1 = doc.data().nota1
          this.nota2 = doc.data().nota2
          this.nota3 = doc.data().nota3
        })
      })
    },
    deleteStud() {
      if(confirm('Vreti sa stergeti acest student ?')) {
        db.collection('studenti').where('stud_id', '==', this.$route.params.stud_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  },
  computed: {
    media: function() {
      return (parseInt(this.nota1) + parseInt(this.nota2) + parseInt(this.nota3))/3
  }
  }
}
</script>
