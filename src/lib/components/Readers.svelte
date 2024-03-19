<script lang="ts">
  import { Render, Subscribe, createTable } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import { onMount } from "svelte";
  import { readers } from "$lib/stores/readerStore";

  const getTerminals = fetch("https://acs.jedlik.cloud/terminal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user"),
    },
  }).then((res) => res.json());

  let table = createTable(readable($readers));

  onMount(async () => {
    const res = await getTerminals;
    readers.set(res);
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID",
    }),
    table.column({
      accessor: "name",
      header: "Name",
    }),
    table.column({
      accessor: ({ id }) => id,
      header: "",
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>

<div class="rounded-md border">
  {#await getTerminals}
    <p>Loading....</p>
  {:then res}
    <p>{res}</p>
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as row}
          <Subscribe rowAttrs={row.attrs()}>
            <Table.Row>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  {/await}
</div>
