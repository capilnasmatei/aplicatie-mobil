<template>
  <div id="new-stud">
    <h3>Student Nou</h3>
    <div class="row">
      <form @submit.prevent="saveStud" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="stud_id" required>
            <label>ID# Student</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nume" required>
            <label>Nume si Prenume</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="anul" required>
            <label>Anul</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota1" required>
            <label>Nota 1:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota2" required>
            <label>Nota 2:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nota3" required>
            <label>Nota 3:</label>
          </div>
        </div>
        <button type="submit" class="btn">Adauga</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'new-stud',
  data () {
    return {
      stud_id: null,
      media: null,
      nume: null,
      anul: null,
      nota1: null,
      nota2: null,
      nota3: null
    }
  },
  methods: {
    saveStud () {
      db.collection('studenti').add({
        stud_id: this.stud_id,
        nume: this.nume,
        anul: this.anul,
        nota1: this.nota1,
        nota2: this.nota2,
        nota3: this.nota3,
        media: (parseInt(this.nota1) + parseInt(this.nota2) + parseInt(this.nota3))/3
      })
      .then(docRef => this.$router.push('/')
      )
      .catch(error => console.log(err))
    }
  },
}
</script>
