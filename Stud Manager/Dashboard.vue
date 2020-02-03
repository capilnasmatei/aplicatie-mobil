<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Studenti</h4></li>
      <li v-for="student in studenti" v-bind:key="student.id" class="collection-item">
        <div class="chip">{{student.anul}}</div>{{student.stud_id}}:{{student.nume}}

        <router-link class="secondary-content" v-bind:to="{name: 'view-stud', params:{stud_id: student.stud_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating
      btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      studenti: []
    }
  },
  created() {
    db.collection('studenti').orderBy('anul').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id' : doc.id,
          'stud_id' : doc.data().stud_id,
          'nume' : doc.data().nume,
          'anul' : doc.data().anul,
          'media' : doc.data().media
        }
        this.studenti.push(data)
      })
    })
  }
}
</script>
