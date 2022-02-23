// The module.exports object at the bottom is the data that powers the index.njk
// template file. When you start seeing {% %} and {{ }}, these are referring to
// objects in this file.
//
// This file is a JavaScript file that runs when the site is generated, which
// lets us flexibly prepare the data and simplifies the template.
const AyushTewari = "Ayush Tewari";
const AbdallahDib = "Abdallah Dib".link("https://www.interdigital.com/talent/?id=38");
const AdamKortylewski = "Adam Kortylewski".link("https://adamkortylewski.com/");
const BerndBickel = "Bernd Bickel".link("http://berndbickel.com/");
const BernhardEgger = "Bernhard Egger".link("https://eggerbernhard.ch/");
const ChristianTheobalt = "Christian Theobalt".link("https://people.mpi-inf.mpg.de/~theobalt/");
const ChristophLassner = "Christoph Lassner".link("https://christophlassner.de/");
const DanielCremers = "Daniel Cremers".link("https://vision.in.tum.de/members/cremers");
const EdgarTretschk = "Edgar Tretschk".link("http://people.mpi-inf.mpg.de/~tretschk/");
const FengXu = "Feng Xu".link("http://cgcad.thss.tsinghua.edu.cn/xufeng/");
const FlorianBernard = "Florian Bernard".link("https://sites.google.com/site/fbernardpi/");
const GereonFox = "Gereon Fox".link("https://people.mpi-inf.mpg.de/~gfox/");
const HansPeterPfister = "Hanspeter Pfister".link("https://vcg.seas.harvard.edu/people/hanspeter-pfister");
const HansPeterSeidel = "Hans-Peter Seidel".link("https://people.mpi-inf.mpg.de/~hpseidel/english.html");
const IkhsanulHabibie = "Ikhsanul Habibie".link("https://www.mpi-inf.mpg.de/~ihabibie/");
const MarcHabermann = "Marc Habermann".link("http://people.mpi-inf.mpg.de/~mhaberma/");
const MallikarjunBR = "Mallikarjun B R".link("http://people.mpi-inf.mpg.de/~mbr");
const MichaelZollhoefer = "Michael Zollhoefer".link("https://zollhoefer.com/");
const MohamedElgharib = "Mohamed Elgharib".link("https://people.mpi-inf.mpg.de/~elgharib/");
const LinjieLyu = "Linjie Lyu".link("http://people.mpi-inf.mpg.de/~atewari/");
const LingjieLiu = "Lingjie Liu".link("https://lingjie0206.github.io/");
const LouisChevallier = "Louis Chevallier".link("https://scholar.google.fr/citations?user=hC_BTU8AAAAJ&hl=en");
const VolkerBlanz = "Volker Blanz".link("http://www.grk1564.uni-siegen.de/de/blanz-volker");
const StefanieWuhrer = "Stefanie Wuhrer".link("http://morpheo.inrialpes.fr/~wuhrer/");
const SamiRomdhani = "Sami Romdhani".link("https://www.linkedin.com/in/sami-romdhani-09775827/");
const TaeHyunOh = "Tae-Hyun Oh".link("https://scholar.google.com/citations?user=dMCBjeIAAAAJ&hl=en");
const TarunYenamandra = "Tarun Yenamandra".link("https://vision.in.tum.de/members/yenamand");
const ThaboBeeler = "Thabo Beeler".link("https://thabobeeler.com/");
const ThomasVetter = "Thomas Vetter".link("https://gravis.dmi.unibas.ch/");
const TimoBolkart = "Timo Bolkart".link("https://ps.is.mpg.de/person/tbolkart");
const TimWeyrich = "Tim Weyrich".link("http://reality.cs.ucl.ac.uk/weyrich.html");
const VladislavGolyanik = "Vladislav Golyanik".link("http://people.mpi-inf.mpg.de/~golyanik/");
const WillSmith = "Will Smith".link("https://www-users.cs.york.ac.uk/wsmith/");
const WojciechMatusik = "Wojciech Matusik".link("https://cdfg.csail.mit.edu/wojciech");
const YuxiaoZhou = "Yuxiao Zhou".link("https://calciferzh.github.io/");


/////Conferences
const ICCV = "ICCV"
const CVPR = "CVPR"
const SIGGRAPH = "SIGGRAPH"
const TOG = "ACM Transactions on Graphics"
const BMVC = "BMVC"

function authorList(authors) {
    var list = [];
    authors.forEach((name, i) => {
        if (name == AyushTewari) {
            name = '<span class="self-author">' + name + "</span>";
        }
        if (i == authors.length - 1) {
            list.push("and " + name);
        } else {
            list.push(name);
        }
    });
    return list.join(", ");
}


module.exports = {
    publications: [
        {
            title: "StyleVideoGAN: A Temporal Generative Model using a Pretrained StyleGAN",
            teaser: "assets/StyleVideoGAN.png",
            authors: authorList([GereonFox, AyushTewari, MohamedElgharib, ChristianTheobalt]),
            conference: BMVC + " 2021 (Oral)",
            data: ["[project page]".link("https://vcai.mpi-inf.mpg.de/projects/stylevideogan/"), "[paper]".link("https://arxiv.org/pdf/2107.07224.pdf")].join(" ")
        },
        {
            title: "Efficient and Differentiable Shadow Computation for Inverse Problems",
            teaser: "assets/EfficientShadows.png",
            authors: authorList([LinjieLyu, MarcHabermann, LingjieLiu, MallikarjunBR, AyushTewari, ChristianTheobalt]),
            conference: ICCV + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/DifferentiableShadows/"), "[paper]".link("https://arxiv.org/pdf/2104.00359.pdf")].join(" ")
        },
        {
            title: "Non-Rigid Neural Radiance Fields: Reconstruction and Novel View Synthesis of a Deforming Scene from Monocular Video",
            teaser: "assets/NRNeRF.png",
            authors: authorList([EdgarTretschk, AyushTewari, VladislavGolyanik, MichaelZollhoefer, ChristophLassner, ChristianTheobalt]),
            conference: ICCV + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/nonrigid_nerf/"), "[paper]".link("https://arxiv.org/pdf/2012.12247.pdf"), "[code]".link("https://github.com/facebookresearch/nonrigid_nerf")].join(" ")
        },
        {
            title: "PhotoApp: Photorealistic Appearance Editing of Head Portraits",
            teaser: "assets/PhotoApp.jpeg",
            authors: authorList([MallikarjunBR, AyushTewari, AbdallahDib, TimWeyrich, BerndBickel, HansPeterSeidel, HansPeterPfister, WojciechMatusik, LouisChevallier, MohamedElgharib, ChristianTheobalt]),
            conference: SIGGRAPH + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/PhotoApp/"), "[paper]".link("https://arxiv.org/pdf/2103.07658.pdf")].join(" ")
        },
        {
            title: "i3DMM: Deep Implicit 3D Morphable Model of Human Heads",
            teaser: "assets/i3dmm.png",
            authors: authorList([TarunYenamandra, AyushTewari, FlorianBernard, HansPeterSeidel, MohamedElgharib, DanielCremers, ChristianTheobalt]),
            conference: CVPR + " 2021 (Oral)",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/i3DMM/"), "[paper]".link("https://arxiv.org/pdf/2011.14143.pdf"), "[code]".link("https://github.com/tarun738/i3DMM")].join(" ")
        },
        {
            title: "Monocular Reconstruction of Neural Face Reflectance Fields",
            teaser: "assets/reflectance.png",
            authors: authorList([MallikarjunBR, AyushTewari, TaeHyunOh, TimWeyrich, BerndBickel, HansPeterSeidel, HansPeterPfister, WojciechMatusik, MohamedElgharib, ChristianTheobalt]),
            conference: CVPR + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/FaceReflectanceFields/"), "[paper]".link("https://arxiv.org/pdf/2008.10247.pdf")].join(" ")
        },
        {
            title: "Learning Complete 3D Morphable Face Models from Images and Videos",
            teaser: "assets/lemomo.png",
            authors: authorList([MallikarjunBR, AyushTewari, HansPeterSeidel, MohamedElgharib, ChristianTheobalt]),
            conference: CVPR + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/LeMoMo/"), "[paper]".link("https://arxiv.org/pdf/2010.01679.pdf")].join(" ")
        },
        {
            title: "Monocular Real-time Full Body Capture with Inter-part Correlations",
            teaser: "assets/yuxiao.jpeg",
            authors: authorList([YuxiaoZhou, MarcHabermann, IkhsanulHabibie, AyushTewari, ChristianTheobalt, FengXu]),
            conference: CVPR + " 2021",
            data: ["[project page]".link("http://gvv.mpi-inf.mpg.de/projects/2021-cvpr-full-body-capture/"), "[paper]".link("https://arxiv.org/pdf/2012.06087.pdf")].join(" ")
        },
        {
            title: "3D Morphable Face Models - Past, Present and Future3dmm",
            teaser: "assets/3dmm.png",
            authors: authorList([BernhardEgger, WillSmith, AyushTewari, StefanieWuhrer, MichaelZollhoefer, ThaboBeeler, FlorianBernard, TimoBolkart, AdamKortylewski, SamiRomdhani, ChristianTheobalt, VolkerBlanz, ThomasVetter]),
            conference: TOG + " 2021",
            data: ["[arXiv]".link("https://arxiv.org/abs/1909.01815")].join(" ")
        },
    ],
    metadata: ["[google scholar]".link("https://scholar.google.com/citations?user=pDnzpeoAAAAJ&hl=en"), "[CV]"].join(" "),
};