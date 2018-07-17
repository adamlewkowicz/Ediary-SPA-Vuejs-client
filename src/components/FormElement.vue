<template>
  <div class="element-wrapper">
    <div class="text-labels">
      <label :for="label.id">{{ label.name }}</label>
      <transition name="slide-bottom">
        <div class="error-message" v-show="!valueIsCorrect && wasTouched">
          {{ renderErrMsg }}
        </div>
      </transition>
    </div>
    <input
      :type="type"
      :id="label.id"
      :class="[
        className,
        { 'input-error': !valueIsCorrect && wasTouched },
        { 'input-valid': wasTouched && !valueIsCorrect }
      ]"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
import Joi from 'joi';

export default {
  name: 'FormElement',
  props: {
    el: Object,
    value: String,
    elKey: Number,
    wasTouched: Boolean,
    isValid: Boolean,
    className: {
      type: String,
      default: 'text'
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: ''
    },
    validation: {
      type: Object
    }
  },
  data() {
    return {
      errorMessage: '',
      aha: null,
      valueIsCorrect: false
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('changedValue', event.target.value, this.elKey);
      // this.value = event.target.value;
      if (!this.wasTouched) {
        this.$emit('touchedElement', this.elKey);
      }
      this.validateValue();
    },
    validateValue() {
      this.valueIsCorrect = Joi.validate(this.value, this.validation.joi, ((err, value) => err === null ? true : false));
    },
    updateErrorMessage (msg) {
      this.errorMessage = msg;
    },
  },
  computed: {
    renderErrMsg() {
      const { _tests: joiConds } = this.validation.joi;
      const minLength = joiConds.find(key => key.name == 'min');
      const maxLength = joiConds.find(key => key.name == 'max');
      if (minLength && this.value.length < minLength.arg) {
        return `Brakuje jeszcze ${minLength.arg - this.value.length} znaków`;
      } else if (maxLength && this.value.length > maxLength.arg) {
        return `Usuń ${this.value.length - maxLength.arg} znaków`;
      } else {
        return this.validation.errMsg || `Wartość ${this.label.name} jest nieprawidłowa`;
      }
    }
  },
  watch: {
    valueIsCorrect(valueCorrectness) {
      this.$emit('validationChange', valueCorrectness, this.elKey);
    }
  }
}
</script>

<style lang="scss" scoped>
.element-wrapper {
  margin-bottom: 10px;
}

.text-labels {
  display: flex;
  height: 30px;
  align-items: center;
  label {
    margin: 0;
  }
}

.input-error {
  border: 1px solid #ff6b81 !important;
}

input {
  border: 1px solid #fff !important;
  outline: none;
  transition: all .3s ease;
}

.error-message {
  color: #d82354;
  text-align: right;
  width: 100%;
}
</style>


