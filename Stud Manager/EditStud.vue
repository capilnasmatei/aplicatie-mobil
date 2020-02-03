<template>
  <div id="edit-stud">
    <h3>Editare Student</h3>
    <div class="row">
      <form @submit.prevent="updateStud" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="stud_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nume" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="anul" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota1" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota2" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota3" required>
          </div>
        </div>
        <button type="submit" class="btn">Modifica</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-stud',
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
    updateStud () {
      db.collection('studenti').where('stud_id', '==', this.$route.params.stud_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            stud_id: this.stud_id,
            nume: this.nume,
            anul: this.anul,
            nota1: this.nota1,
            nota2: this.nota2,
            nota3: this.nota3
          })
          .then(() => {
            this.$router.push({name: 'view-stud', params: {stud_id: this.stud_id}})
          })
        })
      })
    }
  }
}
</script>
