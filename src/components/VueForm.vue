<template>
  <form @submit.prevent="submitForm">
    <form-element
      v-for="(el, elKey) in textInputs"
      :key="elKey"
      :elKey="elKey"
      :label="el.label"
      :type="el.type"
      :validation="el.validation"
      :isValid="el.isValid"
      :wasTouched="el.wasTouched"
      :value="el.value"
      @changedValue="updateValue"
      @validationChange="updateValidStatus"
      @touchedElement="updateTouchStatus"
    />
    <button :class="submitInput.class">
      {{ submitInput.value }}
    </button>

  </form>
</template>

<script>
import FormElement from '@/components/FormElement';

export default {
  components: {
    FormElement
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      disableSubmit: false,
      formDataClone: {...this.formData},
      textInputs: [],
      submitInput: {}
    }
  },
  methods: {
    boro() {
      this.textInputs[0].wasTouched = true;
    },
    submitForm() {
      if (this.valuesAreValid == false) {
        this.textInputs.forEach(el => el.wasTouched = true);
      } else {
        const formObject = this.textInputs.reduce((formObj, currentInput) => {
          formObj[currentInput.name] = currentInput.value;
          return formObj;
        }, {});
        this.$emit('formSubmit', formObject);
      }
    },
    updateValue(value, elKey) {
      this.textInputs[elKey].value = value;
    },
    updateValidStatus(status, elKey) {
      this.textInputs[elKey].isValid = status;
    },
    updateTouchStatus(elKey) {
      this.textInputs[elKey].wasTouched = true;
    }
  },
  computed: {
    valuesAreValid() {
      return this.textInputs.some(el => el.isValid === false) ? false : true;
    }
  },
  mounted() {
    this.textInputs = this.formDataClone.elements
      .filter(el => el.type !== 'submit' || el.type == null)


    this.textInputs.forEach((el, index) => {
        this.$set(this.textInputs[index], 'isValid', false);
        this.$set(this.textInputs[index], 'wasTouched', false);
        this.$set(this.textInputs[index], 'value', '');
    });
    this.submitInput = this.formDataClone.elements.find(el => el.type === 'submit');
    // this.formDataClone.elements.forEach((el, index) => {
    //   if (el.type != 'submit') {
    //     this.$set(this.formDataClone.elements[index], 'isValid', false);
    //     this.$set(this.formDataClone.elements[index], 'wasTouched', false);
    //     if (el.type == null) this.$set(this.formDataClone.elements[index], 'type', 'text');
    //   }
    // });
  }
}
</script>

