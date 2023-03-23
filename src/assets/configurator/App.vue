
<template>
    <div class="configurator">
        <div class="configurator__wrap">
            <div class="configurator__col">
                <div class="configurator__heading">Собери свое решение</div>

                <div class="configurator__preview">
                    <img src="" alt="">
                </div>
            </div>

            <div class="configurator__col">
                <div class="configurator__text">
                    Воспользуйтесь удобным конструктором для составления своего комплекта, идеально подходящего под фасад
                    вашего дома.
                    В конструкторе предусмотрена возможность выбора размеров и узоров
                </div>

                <div class="configurator__controls">
                    <div class="configurator__configurator-block">
                        <div class="configurator-block__wrap">
                            <div class="configurator-block__title" data-index="01">
                                Ставни верхние
                            </div>

                            <Input class="configurator-block__configurator-input" value="500Х300" label="Размер (мм)"
                                disabled id="size_1" />

                            <div class="configurator-block__row">

                                <div class="configurator-block__radio-group">
                                    <div class="configurator-block__radio-group-title">
                                        Узор
                                    </div>
                                    <div class="configurator-block__radio-group-content">
                                        <Radio class="configurator-block__configurator-radio" value="Жалюзи" name="texture"
                                            label="Жалюзи" id="texture_1" :checked="texture === 'Жалюзи'"
                                            :model="texture" />
                                        <Radio class="configurator-block__configurator-radio" value="Филенка" name="texture"
                                            label="Филенка" id="texture_2" :checked="texture === 'Филенка'"
                                            :model="texture" />
                                    </div>
                                </div>

                                <Select class="configurator-block__configurator-select" label="Цвет ставень" :colors="true"
                                    id="color_1" :options="colors" v-model:value="color" />
                            </div>

                            <Input type="number" class="configurator-block__configurator-input" value="8"
                                label="Введите количество окон" large notice="* В комплекте 2 ставни (правая+левая) на каждую сторону окна" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Option } from '~/src/types/configurator';
import Input from './Input.vue';
import Radio from './Radio.vue';
import Select from './Select.vue';

const colors = [
    { value: '#973630', label: 'Красный' },
    { value: '#EBEBEB', label: 'Белый' },
    { value: '#37684', label: 'Зеленый' },
    { value: '#62453F', label: 'Коричневый' }
]

const texture = ref<string>('Жалюзи')
const color = ref<Option>()
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

.configurator {
    &__wrap {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    &__heading {
        font-weight: 600;
        font-size: 60px;
        text-transform: uppercase;
        line-height: 120%;
        font-family: Cormorant, sans-serif;
        max-width: 440px;
        margin-bottom: rem(84px);
    }

    &__text {
        line-height: 175%;
        margin-bottom: rem(84px);
    }
}

.configurator-block {
    &__wrap {
        position: relative;
        display: grid;
        gap: rem(32px);
    }

    &__title {
        position: relative;
        font-weight: 800;
        font-size: rem(20px);
        color: $main;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding-bottom: rem(10px);
        border-bottom: 2px solid $main;

        &::before {
            content: attr(data-index);
            position: absolute;
            left: -30px;
            font-size: 16px;
            font-weight: 400;
        }
    }

    &__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: rem(50px);
    }

    &__radio-group {
        &-title {
            font-weight: 500;
            color: #AFAFAF;
            margin-bottom: rem(6px);
            display: block;
        }

        &-content {
            display: flex;
            gap: rem(10px);
        }
    }
}
</style>