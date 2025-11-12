// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#2c3e50';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // 初始化知识图谱
    initKnowledgeGraph();
});

// 滚动到指定部分
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// 知识图谱功能
function initKnowledgeGraph() {
    const graph = document.getElementById('graph');
    if (!graph) return;
    
    // 创建简单的知识图谱节点
    const nodes = [
        { id: 'mri', name: '磁共振成像', x: 50, y: 50, type: 'main' },
        { id: 'sequences', name: '成像序列', x: 25, y: 25, type: 'category' },
        { id: 't1', name: 'T1加权', x: 15, y: 15, type: 'tech' },
        { id: 't2', name: 'T2加权', x: 35, y: 15, type: 'tech' },
        { id: 'dwi', name: '扩散加权', x: 25, y: 35, type: 'tech' },
        { id: 'applications', name: '临床应用', x: 75, y: 25, type: 'category' },
        { id: 'neuro', name: '神经影像', x: 65, y: 15, type: 'app' },
        { id: 'cardio', name: '心血管成像', x: 85, y: 15, type: 'app' },
        { id: 'analysis', name: '数据分析', x: 50, y: 75, type: 'category' },
        { id: 'reconstruction', name: '图像重建', x: 35, y: 85, type: 'process' },
        { id: 'quantitative', name: '定量分析', x: 50, y: 85, type: 'process' },
        { id: 'segmentation', name: '图像分割', x: 65, y: 85, type: 'process' }
    ];
    
    // 创建节点
    nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = `graph-node ${node.type}`;
        nodeElement.textContent = node.name;
        nodeElement.style.left = `${node.x}%`;
        nodeElement.style.top = `${node.y}%`;
        nodeElement.style.position = 'absolute';
        nodeElement.style.background = getNodeColor(node.type);
        nodeElement.style.color = 'white';
        nodeElement.style.padding = '10px 15px';
        nodeElement.style.borderRadius = '25px';
        nodeElement.style.cursor = 'pointer';
        nodeElement.style.transition = 'all 0.3s ease';
        nodeElement.style.textAlign = 'center';
        nodeElement.style.minWidth = '120px';
        nodeElement.style.boxShadow = '0 3px 6px rgba(0,0,0,0.1)';
        nodeElement.style.fontWeight = '500';
        nodeElement.style.zIndex = '2';
        
        // 添加点击事件
        nodeElement.addEventListener('click', function() {
            showNodeInfo(node);
        });
        
        // 悬停效果
        nodeElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        nodeElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 6px rgba(0,0,0,0.1)';
        });
        
        graph.appendChild(nodeElement);
    });
}

// 获取节点颜色
function getNodeColor(type) {
    const colors = {
        'main': '#2c3e50',
        'category': '#3498db',
        'tech': '#2ecc71',
        'app': '#e74c3c',
        'process': '#9b59b6'
    };
    
    return colors[type] || '#3498db';
}

// 显示节点信息
function showNodeInfo(node) {
    const nodeInfo = {
        'mri': '磁共振成像（Magnetic Resonance Imaging, MRI）是一种利用核磁共振原理的医学影像技术，能够生成人体内部结构的详细图像。',
        'sequences': 'MRI成像序列是一系列射频脉冲和梯度磁场的组合，用于产生不同类型的组织对比度图像。',
        't1': 'T1加权成像突出显示解剖结构，脂肪组织显示为亮信号，水显示为暗信号。',
        't2': 'T2加权成像对水含量敏感，常用于检测水肿、炎症和某些病理变化。',
        'dwi': '扩散加权成像通过测量水分子扩散运动来评估组织微观结构，对急性脑缺血特别敏感。',
        'applications': 'MRI广泛应用于神经、心血管、肌肉骨骼、腹部和盆腔等部位的临床诊断。',
        'neuro': '神经影像应用包括脑肿瘤、脑血管疾病、神经退行性疾病和发育异常等的诊断与评估。',
        'cardio': '心脏MRI可评估心脏结构、功能、灌注和 viability，对心肌病、先天性心脏病等有重要诊断价值。',
        'analysis': 'MRI数据分析包括图像重建、后处理、定量参数提取和人工智能辅助诊断等。',
        'reconstruction': '图像重建是将原始k空间数据转换为可视图像的过程，常用方法包括傅里叶变换和压缩感知。',
        'quantitative': '定量MRI分析提取组织的物理和生理参数，如T1、T2弛豫时间、扩散系数和灌注参数等。',
        'segmentation': '图像分割是将图像划分为具有不同意义的区域，常用于器官、组织和病变的自动识别与定量分析。'
    };
    
    alert(`${node.name}\n\n${nodeInfo[node.id] || '详细信息正在更新中...'}`);
}

// 知识图谱控制函数
function resetGraph() {
    alert('知识图谱已重置');
}

function zoomIn() {
    alert('知识图谱已放大');
}

function zoomOut() {
    alert('知识图谱已缩小');
}