<!-- src/components/common/SessionTimes.vue -->
<template>
  <div class="session-times">
    <div class="session-times__header">
      <h3 class="session-times__title">{{ title }}</h3>
      <div v-if="filterable" class="session-times__filters">
        <button v-for="(filter, index) in filters" :key="index" class="session-times__filter"
          :class="{ 'session-times__filter--active': filter.active }" @click="toggleFilter(filter.id)">
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="session-times__container">
      <div v-for="(session, index) in filteredSessions" :key="index" class="session" @click="onSessionClick(session)">
        <div class="session__time">{{ session.hora }}</div>
        <div class="session__room">{{ session.sala }}</div>
        <div v-if="session.esISense || session.esVOSE" class="session__tags">
          <div v-if="session.esISense" class="session__tag session__tag--isense">iSense</div>
          <div v-if="session.esVOSE" class="session__tag session__tag--vose">VOSE</div>
        </div>
      </div>

      <div v-if="filteredSessions.length === 0" class="session-times__empty">
        No hay sesiones disponibles para los filtros seleccionados.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session } from '@/types/Session';

interface Props {
  sessions: Session[];
  title?: string;
  filterable?: boolean;
}

interface Filter {
  id: 'isense' | 'vose' | 'normal';
  label: string;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Horarios Disponibles',
  filterable: true
});

const emit = defineEmits<{
  (e: 'select-session', session: Session): void
}>();

// Filters state
const filters = ref<Filter[]>([
  { id: 'isense', label: 'iSense', active: false },
  { id: 'vose', label: 'VOSE', active: false },
  { id: 'normal', label: 'Normales', active: false }
]);

// Toggle filter
const toggleFilter = (filterId: 'isense' | 'vose' | 'normal') => {
  const filter = filters.value.find(f => f.id === filterId);
  if (filter) {
    filter.active = !filter.active;
  }
};

// Filtered sessions based on active filters
const filteredSessions = computed(() => {
  // If no filters are active, return all sessions
  const activeFilters = filters.value.filter(f => f.active);
  if (activeFilters.length === 0) {
    return props.sessions;
  }

  return props.sessions.filter(session => {
    // Check if session matches any active filter
    return activeFilters.some(filter => {
      if (filter.id === 'isense') return session.esISense;
      if (filter.id === 'vose') return session.esVOSE;
      if (filter.id === 'normal') return !session.esISense && !session.esVOSE;
      return false;
    });
  });
});

// Handle session click
const onSessionClick = (session: Session) => {
  emit('select-session', session);
};
</script>

<style lang="scss" scoped>
.session-times {
  margin: 2rem 0;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;

    @include md {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__title {
    margin: 0;
    margin-bottom: 1rem;

    @include md {
      margin-bottom: 0;
    }
  }

  &__filters {
    display: flex;
    gap: 1rem;
  }

  &__filter {
    padding: 0.5rem 1rem;
    border: 1px solid $color-primary;
    background-color: transparent;
    color: $color-text;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: all $transition-normal;
    font-size: $font-size-sm;

    &--active {
      background-color: $color-primary;
      color: white;
    }

    &:hover:not(&--active) {
      background-color: rgba($color-primary, 0.2);
    }
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  &__empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: $color-text-secondary;
    font-style: italic;
  }
}

.session {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid $color-primary;
  border-radius: $border-radius-md;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all $transition-normal;
  min-height: 85px;

  &:hover {
    background-color: rgba($color-primary, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &__time {
    font-size: $font-size-lg;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  &__room {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__tags {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  &__tag {
    background-color: $color-primary;
    padding: 0.2rem 0.4rem;
    font-size: $font-size-xs;
    font-weight: bold;
    color: white;

    &--isense {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      display: flex;
      align-items: center;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      padding: 0.5rem;
      border-top-right-radius: $border-radius-md;
      border-bottom-right-radius: $border-radius-md;
    }

    &--vose {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.2rem 0.4rem;
      border-bottom-right-radius: $border-radius-md;
      border-top-left-radius: $border-radius-sm;
    }
  }
}
</style>
