<template>
  <div class="style">
    <q-page>
      <h4 class="text-center">{{wordDisplay}}</h4>
      {{guessFeedback}}
      <br>
      <q-input
        v-model="guessField"
        float-label="Enter a Letter"
        @keyup="guessLetter"
      />
      <br/>
      <p v-for="letter in guessedLetters">
        {{letter}}
      </p>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
  export default {
    name: 'PageIndex',
    data() {
      return {
        word: "",
        guessField: "",
        wordDisplay: "",
        guessFeedback: "",
        guessedLetters: []
      }
    },
    created() {
      this.$axios.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
        .then(response => {
          this.word = response.data[0].word
          console.log(this.word)

          this.wordDisplay = response.data[0].word.replace(/[a-z]/g, '_')
        })
    },
    methods: {
      guessLetter() {
        if (this.word.includes(this.guessField)) {
          let indices = [];
          for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === this.guessField) indices.push(i);
          }

          for (let i = 0; i < indices.length; i++) {
            console.log(indices[i]);
            this.wordDisplay = this.setCharAt(this.wordDisplay, indices[i], this.guessField)
          }
        }

        else {
          this.guessFeedback = "Sorry this word doesn't contain " + this.guessField
          this.guessedLetters.push(this.guessField)
        }
        this.resetGuessField()
        this.checkWin()
      },
      setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
      },
      resetGuessField() {
        this.guessField = ""
      },
      checkWin() {
        if (!this.wordDisplay.includes("_")) {
          this.$q.notify({
            message: "Game Won",
            timeout: 2000,
            type: "positive",
            position: "center"
          });
          this.resetWord()
          this.resetGuesses()
        }
      },
      resetWord() {
        this.$axios.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
          .then(response => {
            this.word = response.data[0].word
            console.log(this.word)

            this.wordDisplay = response.data[0].word.replace(/[a-z]/g, '_')
          })
      },
      resetGuesses() {
        this.guessedLetters = []
        this.guessFeedback = ""
      }
    },
  }
</script>

<style scoped>
  style {
    width: 150px;
  }
</style>
