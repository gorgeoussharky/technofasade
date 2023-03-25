<template>
    <div class="configurator-radio">
        <div class="configurator-radio__wrap">
            <input type="radio" class="configurator-radio__control" :id="id" :name="name" @change="handleChange($event)"
                :value="value" :disabled="disabled" :checked="checked">
            <label class="configurator-radio__label" :for="id">{{ label }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';

interface Props {
    label?: string;
    name: string;
    value: string
    model: string;
    disabled?: boolean
    checked?: boolean
}

interface Emits {
    (e: 'update:model', value: string): void;
}

const id = nanoid()

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleChange = (e: Event) => {
    emit('update:model', (e.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/maps';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/containers';
@import '~sass-rem/rem';
@import '@/assets/scss/base/variables';

.configurator-radio {
    &__wrap {
        position: relative;
    }

    &__control {
        opacity: 0;
        position: absolute;
        appearance: none;
        z-index: -999;

        &:checked {
            ~label {
                color: #fff;
                background: #CB9274;
                transition: 350ms;
            }
        }

        &:disabled {
            ~label {
                opacity: 0.5;
                filter: grayscale(100);
                cursor: not-allowed;
            }
        }
    }

    &__label {
        padding: rem(4px) rem(14px);
        font-weight: 500;
        font-size: rem(18px);
        background: #EDD7CB;
        border-radius: 40px;
        cursor: pointer;
        transition: 350ms;

        
        @include media-breakpoint-down(sm) {
            font-size: 18px;
            padding: 4px 12px;
        }
    }
}
</style>