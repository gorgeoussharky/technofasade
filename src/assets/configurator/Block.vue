<template>
    <div class="configurator-block" :class="!active && 'configurator-block--inactive'" ref="block">
        <div class="configurator-block__wrap">
            <div class="configurator-block__head">
                <div class="configurator-block__title" :data-index="index">
                    {{ title }}
                </div>

                <div class="configurator-block__switchbox" v-if="props.togglable">
                    <div class="switchbox__wrap">
                        <input type="checkbox" @change="handleActiveChange" :id="`show_${index}`" :checked="active"
                            class="switchbox__control">
                        <label class="switchbox__label" :for="`show_${index}`"></label>
                    </div>
                </div>
            </div>

            <div class="configurator-block__content" v-show="active">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
    title: string
    index: string
    togglable?: boolean
    active?: boolean
}

interface Emits {
    (e: 'update:active', value: boolean): void
    (e: 'intersection'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const block = ref<HTMLElement>()

const handleActiveChange = () => {
    emit('update:active', !props.active)
}

onMounted(() => {
    if (!block.value || !window.matchMedia('(max-width:991px)').matches) return

    const handleIntersect = (e: IntersectionObserverEntry[]) => {
        if (e[0].isIntersecting && props.active) {

            emit('intersection')
            return
        }

    }

    const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    })

    observer.observe(block.value)
})

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

.configurator-block {
    &__wrap {
        position: relative;
        padding-bottom: rem(46px);
        border-bottom: 1px solid $main;

        &::after {
            content: '';
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: $bodybg;
            background-image: url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4.48866' y='11.6826' width='11.5219' height='11.5219' transform='rotate(-45 4.48866 11.6826)' stroke='%23CB9274' stroke-width='5'/%3E%3C/svg%3E%0A");
            background-size: 25px 25px;
            background-position: center;
            background-repeat: no-repeat;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -30px;
        }
    }

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: rem(10px);
        border-bottom: 2px solid $main;
        margin-bottom: rem(32px);
        transition: 350ms;
    }

    &__title {
        position: relative;
        font-weight: 800;
        font-size: rem(20px);
        color: $main;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        line-height: 1;

        @include media-breakpoint-down(sm) {
            font-size: 18px;
        }

        &::before {
            content: attr(data-index);
            position: absolute;
            left: -40px;
            top: -10px;
            font-size: 16px;
            font-weight: 400;

            @include media-breakpoint-down(sm) {
                font-size: 12px;
                left: -20px;
            }
        }
    }

    &__content {
        display: grid;
        gap: rem(32px);
    }

    &--inactive {
        filter: grayscale(100);

        .configurator-block__head {
            border-color: transparent;
            transition: 350ms;
        }
    }
}

.switchbox {
    &__wrap {
        position: relative;
        display: flex;
        align-items: center;
    }

    &__control {
        position: absolute;
        opacity: 0;
        z-index: -999;
        appearance: none;

        &:checked {
            ~label {
                &::before {
                    left: 41px;
                    transition: 350ms;
                }
            }
        }
    }

    &__label {
        background: $bodybg;
        border: 2px solid $main;
        border-radius: 30px;
        height: 40px;
        width: 84px;
        position: relative;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: $main;
            left: -2px;
            top: -2px;
            transition: 350ms;
        }
    }
}
</style>