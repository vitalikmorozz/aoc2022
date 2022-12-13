import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

type Node = {
    type: 'dir' | 'file'
    name: string;
    parent?: Node;
    children?: Map<string, Node>;
    size: number;
}

const rootNode: Node = {
    name: '/',
    type: 'dir',
    size: 0,
    children: new Map(),
    parent: undefined,
}

let currentNode: Node = rootNode;

const recalculateParentSize = (node: Node, size: number) => {
    node.size = size + (node.size || 0);
    if (node.parent) {
        recalculateParentSize(node.parent, size);
    }
}

const printTree = (node: Node, depth = 0) => {
    console.log(`${'-'.repeat(depth)} ${node.name} ${node.size ? `size: ${node.size}` : ''}`);
    if (node.children) {
        Array.from(node.children.values()).forEach(node => printTree(node, depth + 2));
    }
}

const filterDirs = (node: Node, size: number): Node[] => {
    if (node.type !== 'dir') return [];
    const res: Node[] = [];
    if (node.size > size) res.push(node);
    if (node.children) {
        res.push(...Array.from(node.children.values()).reduce((acc, curNode) => acc.concat(filterDirs(curNode, size) || []), [] as Node[]));
    }
    return res;
}

fileContent.trim().split('\n').forEach((command) => {
    if (command.match(/\$ cd/)) {
        const changeTo = command.slice(5);
        if (changeTo === '/') return currentNode = rootNode;
        if (changeTo === '..') return currentNode = currentNode.parent!;
        return currentNode = currentNode.children?.get(changeTo)!;
    }
    if (command.match(/\$ ls/)) return currentNode.children = new Map();
    
    const [dirOrSize, name] = command.split(' ');

    if (dirOrSize === 'dir') return currentNode.children?.set(name, {
        type: 'dir',
        parent: currentNode,
        size: 0,
        name,
    });

    currentNode.children?.set(name, {
        type: 'file',
        parent: currentNode,
        size: parseInt(dirOrSize),
        name,
    });

    recalculateParentSize(currentNode, parseInt(dirOrSize));
})

// printTree(rootNode);

const neededSpace = 30000000 - (70000000 - rootNode.size);

const result = filterDirs(rootNode, neededSpace).sort((a, b) => a.size - b.size)[0].size;

console.log(result);