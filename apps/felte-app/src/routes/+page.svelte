<script lang="ts" context="module">
    import { createForm } from 'felte';
    import { validator } from '@felte/validator-zod';
    import * as zod from 'zod';
    import type { PageData } from './$types';
</script>

<script lang="ts">
  export let data: PageData;

  const formSchema = zod.object({
    firstName: zod.string().min(1).max(250),
    lastName: zod.string().min(1).max(250)
  });

  const { form, errors } = createForm({
    extend: validator({ schema: formSchema })
  });
</script>
  
  <h1>Hell world</h1>

  <form use:form>
    <input type="text" name={data.metadata.description} />
    <input type="text" name="lastName" />
    <button type="submit">Submit</button>
  </form>