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
      @validationChange="updateValidStatus"
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
      defaultOptions: {
        element: {
          type: 'text'
        }
      },
      disableSubmit: false
    }
  },
  methods: {
    submitForm() {
      // this.textInputs[0].isValid = true;
      // for (let input of this.textInputs) {
      //   input.isValid = true;
      // }
      // this.textInputs.forEach((el, index) => {
      //   this.textInputs[index].isValid = true;
      // });
      if (this.formDataClone.elements.some(el => el.isValid == false)) {
        // this.formDataClone.elements.forEach(el => el.wasTouched = true);
      } else {

      }
    },
    updateValidStatus(status, elKey) {
      this.textInputs[elKey].isValid = status;
    }
  },
  computed: {
    formDataClone() {
      return {
        ...this.formData,
        elements: this.formData.elements.map(el => ({
          ...el,
          type: el.type == null ? 'text' : el.type
        }))
      }
    },
    textInputs() {
      return this.formDataClone.elements
        .filter(el => el.type === 'text' || el.type === 'password' || el.type === 'number')
        .map(el => ({
          ...el,
          isValid: false,
          wasTouched: false
        }));
    },
    submitInput() {
      return this.formDataClone.elements.find(el => el.type === 'submit');
    },
    valuesAreValid() {
      return this.textInputs.some(el => el.isValid === false) ? false : true;
    }
  },
  created() {
    this.formData = {...this.formData, mareq: 999 }
    // this.formDataClone = {
    //   ...this.formData,
    //   elements: this.formData.elements.map(el => ({
    //     ...el,
    //     type: el.type == null ? 'text' : el.type,
    //     isValid: false,
    //     wasTouched: false
    //   }))
    // }
  }
}
</script>

