import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useMindMap = (mindMapId: string) => {
  const queryClient = useQueryClient();

  const { data: mindMap } = useQuery({
    queryKey: ['mindMap', mindMapId],
    queryFn: () => fetch(`/api/mindmaps/${mindMapId}`).then(res => res.json()),
  });

  const addNodeMutation = useMutation({
    mutationFn: (node: { content: string; x: number; y: number; parentId?: string }) =>
      fetch(`/api/mindmaps/${mindMapId}/nodes`, {
        method: 'POST',
        body: JSON.stringify(node),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindMap', mindMapId] });
    },
  });

  const updateNodePositionMutation = useMutation({
    mutationFn: ({ nodeId, x, y }: { nodeId: string; x: number; y: number }) =>
      fetch(`/api/mindmaps/${mindMapId}/nodes/${nodeId}`, {
        method: 'PATCH',
        body: JSON.stringify({ x, y }),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindMap', mindMapId] });
    },
  });

  return {
    mindMap,
    addNode: addNodeMutation.mutate,
    updateNodePosition: updateNodePositionMutation.mutate,
  };
};
