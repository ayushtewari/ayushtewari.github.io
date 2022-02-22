// The module.exports object at the bottom is the data that powers the index.njk
// template file. When you start seeing {% %} and {{ }}, these are referring to
// objects in this file.
//
// This file is a JavaScript file that runs when the site is generated, which
// lets us flexibly prepare the data and simplifies the template.
const AyushTewari = "Ayush Tewari";
const AbdallahDib = "Abdallah Dib".link("https://www.interdigital.com/talent/?id=38");
const BerndBickel = "Bernd Bickel".link("http://berndbickel.com/");
const ChristianTheobalt = "Christian Theobalt".link("https://people.mpi-inf.mpg.de/~theobalt/");
const ChristophLassner = "Christoph Lassner".link("https://christophlassner.de/");
const EdgarTretschk = "Edgar Tretschk".link("http://people.mpi-inf.mpg.de/~tretschk/");
const GereonFox = "Gereon Fox".link("https://people.mpi-inf.mpg.de/~gfox/");
const HansPeterPfister = "Hanspeter Pfister".link("https://vcg.seas.harvard.edu/people/hanspeter-pfister");
const HansPeterSeidel = "Hans-Peter Seidel".link("https://people.mpi-inf.mpg.de/~hpseidel/english.html");
const MarcHabermann = "Marc Habermann".link("http://people.mpi-inf.mpg.de/~mhaberma/");
const MallikarjunBR = "Mallikarjun B R".link("http://people.mpi-inf.mpg.de/~mbr");
const MichaelZollhoefer = "Michael Zollhoefer".link("https://zollhoefer.com/");
const MohamedElgharib = "Mohamed Elgharib".link("https://people.mpi-inf.mpg.de/~elgharib/");
const LinjieLiu = "Linjie Liu".link("http://people.mpi-inf.mpg.de/~atewari/");
const LingjieLiu = "Linjie Liu".link("https://lingjie0206.github.io/");
const LouisChevallier = "Louis Chevallier".link("https://scholar.google.fr/citations?user=hC_BTU8AAAAJ&hl=en");
const TimWeyrich = "Tim Weyrich".link("http://reality.cs.ucl.ac.uk/weyrich.html");
const VladislavGolyanik = "Vladislav Golyanik".link("http://people.mpi-inf.mpg.de/~golyanik/");
const WojciechMatusik = "Wojciech Matusik".link("https://cdfg.csail.mit.edu/wojciech");


/////Conferences
const ICCV = "ICCV"
const CVPR = "CVPR"
const SIGGRAPH = "SIGGRAPH"
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
            authors: authorList([LinjieLiu, MarcHabermann, LingjieLiu, MallikarjunBR, AyushTewari, ChristianTheobalt]),
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

    ],
};