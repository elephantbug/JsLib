// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

new Vue({
  // root node
  el: "#app",
  // the instance state
  data: function() {
    return {
      name: "John Smith",
      email: {
        value: "js@gopnik.ru",
        valid: true
      },
      message: {
        text: `Dear Mr. President,\n...`,
        maxlength: 64 * 1024
      },
      submitted: false
    };
  },
  methods: {
    // submit form handler
      submit: function ()
      {
        fetch("validate-recaptcha.php", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                name: "myName",
                password: "myPassword"
            })
        })
        .then((response) => {
            //do something awesome that makes the world a better place
            alert(response.statusText);
        });
    },
    // validate by type and value
    validate: function(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
    // check for valid email adress
    isEmail: function(value) {
      return emailRegExp.test(value);
    },
  },
  watch: {
    // watching nested property
    "email.value": function(value) {
      this.validate("email", value);
    }
  }
});

