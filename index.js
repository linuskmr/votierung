class Task {
  value = false

  get binary() {
    return this.value ? '1' : '0'
  }

  toString() {
    return this.binary;
  }
}

const vue = new Vue({
  data: {
    name: localStorage.getItem('name') || 'Name',
    number_of_tasks: 4,
    sheet_number: 3,
    tasks: [],
    copy_clipboard: false
  },
  computed: {
    csv_output: function() {
      const csv = [this.sheet_number, this.name, ...this.tasks]
      return csv.join(';')
    },
    csv_filename: function() {
      const name_wo_spaces = this.name.replace(' ', '')
      return `Übungsblatt${this.sheet_number}_${name_wo_spaces}.csv`
    }
  },
  methods: {
    update_task_list: function() {
      const delta = this.number_of_tasks - this.tasks.length
      if (delta > 0) {
        // If positiov, add the number of delta elements
        for (let i = 0; i < delta; i++) {
          this.tasks.push(new Task())
        }
      } else if (delta < 0) {
        // If negative, remove the number of delta elements
        for (let i = 0; i < -delta; i++) {
          this.tasks.pop()
        }
      }
    }, copy_csv_to_clipboard: function() {
      navigator.clipboard.writeText(this.csv_output)
      document.getElementById("copy_csv_to_clipboard_button").innerText = "kopiert 🎉"
    }
  },
  watch: {
    number_of_tasks: function() {
      this.number_of_tasks = this.number_of_tasks < 0 ? 0 : this.number_of_tasks
      this.update_task_list()
    },
    name: function() {
      // Save name in localStorage for future visits of this site
      localStorage.setItem('name', this.name)
    },
    sheet_number: function() {
      this.sheet_number = this.sheet_number < 0 ? 0 : this.sheet_number
    }
  },
  el: '#app'
})
vue.update_task_list()
