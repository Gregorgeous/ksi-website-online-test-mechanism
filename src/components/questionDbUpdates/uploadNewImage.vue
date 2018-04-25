<template>
  <div>
    <v-layout>
      <v-flex>
        <v-card>
          <input type="file" ref="fileInput" style="display:none" @change="onFileChanged" accept="img/*" >
          <v-btn @click="onFilePicked">
            Pick file
          </v-btn>
          <v-btn v-if="selectedImageURL" @click="onUpload">
            Upload
          </v-btn>
          <img v-if="selectedImageURL" :src="selectedImageURL"
          width="100%" alt="">
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar :timeout="6000" top v-model="snackbar">
      Na razie widok ogólny, dajcie mi znać co chcielibyście w widoku szczegółowym :)
      <v-btn flat class='amber--text' @click="snackbar = false">Zamknij</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
  export default {
    name: 'UploadNewImage',
    data() {
      return {
        selectedImage: null,
        selectedImageName: '',
        selectedImageURL: ''
      }
    },
    methods: {
      onFilePicked(){
        this.$refs.fileInput.click();
      },
      onFileChanged(event) {
        let file = event.target.files[0];
        this.selectedImageName = file.name;
        let fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.selectedImageURL = fileReader.result;
        })
        fileReader.readAsDataURL(file);
        this.selectedImage = file;
      },
      onUpload() {
        // upload file
      }
    },
    computed: {
    }
  }

</script>

<style scoped>
  #badNewsTitle {
    padding-bottom: 0
  }

</style>
